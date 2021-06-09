import { ObjectId } from "mongodb";
import * as yup from "yup";
import {
  IResolvers,
  ForbiddenError,
  AuthenticationError,
} from "apollo-server-express";
import { Database, Viewer, User, LoginProvider } from "../../../lib/types";
import { formatYupError, logger } from "../../../lib/utils";
import {
  authorizeRefreshToken,
  generateRandomExpToken,
  verifyToken,
  hashPassword,
  generateCSRTTokenWithExp,
  generateBothTokens,
  comparePassword,
} from "../../../lib/auth";

import { keys } from "../../../lib/config/keys";
import { Google } from "../../../lib/api/Google";
import { SignInArgs, RegisterArgs, SignInViaEmailArgs } from "./types";
import { Response, Request } from "express";
import { RegisterRules, SignInViaEmailRules } from "../../../lib/validations/";
import jwt from "jsonwebtoken";
const cookieOpts = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true,
};

const createViewer = (user: User): Viewer => {
  return {
    _id: user._id.toHexString(),
    email: user.email,
    csrfToken: user.csrfToken,
    displayName: user.displayName,
    avatar: user.avatar,
    walletId: user.walletId,
    provider: user.provider,
    didRequest: true,
  };
};

const signInViaGoogle = async (
  code: string,
  csrfToken: string,
  rndExp: number,
  db: Database,
  res: Response
): Promise<User | undefined> => {
  const { user } = await Google.signIn(code);
  logger("[signInViaGoogle] get google user... PASSED!");

  if (!user) {
    throw new Error("Google sign in error");
  }
  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null;
  const userName = userNamesList ? userNamesList[0].displayName : null;
  const firstName = userNamesList ? userNamesList[0].givenName : null;
  const lastName = userNamesList ? userNamesList[0].familyName : null;

  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;

  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google sign in error");
  }

  //generate both access token and refresh token
  logger("generated accessToken and refreshToken...");
  const viewerData = {
    _id: userId,
    first_name: firstName,
    last_name: lastName,
    email: userEmail,
    csrfToken,
    provider: LoginProvider.GOOGLE,
  };
  const { accessToken, refreshToken } = await generateBothTokens(
    viewerData,
    rndExp
  );

  if (!accessToken || !refreshToken) {
    throw new Error("Could not generate token!");
  }
  //check if google account already exists
  const updateRes = await db.users.findOneAndUpdate(
    { "google._id": userId },
    {
      $set: {
        displayName: userName,
        avatar: userAvatar,
        accessToken,
        refreshToken,
        csrfToken,
        google: {
          _id: userId,
          email: userEmail,
          displayName: userName,
        },
      },
    },
    { returnOriginal: false }
  );
  let viewer = updateRes.value;
  if (!viewer) {
    const insertResult = await db.users.insertOne({
      accessToken,
      refreshToken,
      csrfToken,
      displayName: userName,
      first_name: firstName,
      last_name: lastName,
      provider: LoginProvider.GOOGLE,
      avatar: userAvatar,
      email: userEmail,
      income: 0,
      bookings: [],
      rooms: [],
      google: {
        _id: userId,
        email: userEmail,
        displayName: userName,
      },
    });
    viewer = insertResult.ops[0];
  }

  //set access tokens to cookie
  res.cookie("accessToken", accessToken, {
    ...cookieOpts,
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOpts,
    maxAge: 365 * 24 * 60 * 60 * 1000, //1 year
  });

  return viewer;
};

const signInViaCookie = async (
  db: Database,
  csrfToken: string,
  req: Request,
  res: Response
): Promise<User | null> => {
  try {
    const accessToken = req.signedCookies.accessToken;
    //logger("login via cookie", accessToken);
    const csrfToken = req.get("X-CSRF-TOKEN");
    if (!accessToken || !csrfToken) {
      return null;
    }

    const decodedToken = await verifyToken(
      accessToken,
      process.env.SECRET || keys.secretKey
    );

    if (decodedToken.data.csrfToken !== csrfToken) {
      res.clearCookie("accessToken", cookieOpts);
      res.clearCookie("refreshToken", cookieOpts);
      delete req.headers["X-CSRF-TOKEN"];
      logger("[signInViaCookie] both csrfToken are different... FAILED!");
      logger(decodedToken.data.csrfToken);
      logger(csrfToken);
      throw new AuthenticationError("User authentication failed!");
    }

    //logger("decode and check access token is expired", decodedToken);
    if (!decodedToken) {
      return null;
    }

    // const updateRes = await db.users.findOneAndUpdate(
    //   { _id: new ObjectId(decodedToken.data._id) },
    //   { $set: { csrfToken } },
    //   { returnOriginal: false }
    // );
    // const viewer = updateRes.value;

    const viewer = await db.users.findOne({
      _id: new ObjectId(decodedToken.data._id),
    });

    if (!viewer) {
      res.clearCookie("accessToken", cookieOpts);
      res.clearCookie("refreshToken", cookieOpts);
      return null;
    }

    return viewer;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      logger("[signInViaCookie] accessToken is expired!");
      throw new AuthenticationError("Token has been expired!");
    }
    throw new Error("Failed to sign in via cookie!");
  }
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
      }
    },
  },
  Mutation: {
    register: async (
      _root: undefined,
      { user }: RegisterArgs,
      { db, res }: { db: Database; res: Response }
    ) => {
      logger(user);
      try {
        //validate inputs with Yup
        await RegisterRules.validate(user, { abortEarly: false });

        const isEmailExists = await db.users.findOne({ email: user.email });

        if (isEmailExists) {
          throw new Error("Email is already registered!");
        }
        const rndExp = generateRandomExpToken(
          process.env.TOKEN_LIFE || keys.tokenLife
        );
        if (!rndExp) {
          logger(
            "[register] Could not generate random expired token date... FAILED!"
          );
          throw new Error("Uhh! Something went wrong, please login again!");
        }
        //hashing password
        const hashedPassword = await hashPassword(user.password);

        //create access, refresh and CSRF token
        const csrfToken = await generateCSRTTokenWithExp(24, rndExp);
        if (!csrfToken) {
          logger("[register] Could not generate csrfToken... FAILED!");
          throw new Error("Could not generate csrfToken!");
        }
        const newUserId = new ObjectId();
        //create access and refresh token
        const viewerData = {
          _id: newUserId.toHexString(),
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          csrfToken,
          provider: LoginProvider.EMAIL,
        };

        const { accessToken, refreshToken } = await generateBothTokens(
          viewerData,
          rndExp
        );

        //insert new user
        const newUserRes = await db.users.insertOne({
          _id: newUserId,
          email: user.email,
          accessToken,
          refreshToken,
          csrfToken,
          displayName: user.first_name + " " + user.last_name,
          first_name: user.first_name,
          last_name: user.last_name,
          password: hashedPassword,
          provider: LoginProvider.EMAIL,
          income: 0,
          bookings: [],
          rooms: [],
        });

        if (!newUserRes) {
          throw new Error("Sorry! Something went wrong. Could not register!");
        }
        //set access tokens to cookie
        //set access tokens to cookie
        res.cookie("accessToken", accessToken, {
          ...cookieOpts,
          maxAge: 60 * 60 * 1000, // 1 hour
        });
        res.cookie("refreshToken", refreshToken, {
          ...cookieOpts,
          maxAge: 365 * 24 * 60 * 60 * 1000, //1 year
        });

        const viewer = newUserRes.ops[0];

        return { data: createViewer(viewer), errors: null };
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          logger("[register] yup errors", formatYupError(error));
          return {
            data: { didRequest: true },
            errors: formatYupError(error),
          };
        } else {
          logger("[register] error!");
          throw error;
        }
      }
    },
    signIn: async (
      _root: undefined,
      { input }: SignInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ) => {
      try {
        //check Google auth0 code
        const code = input ? input.code : null;
        //create csrfToken every time sign in
        const rndExp = generateRandomExpToken(
          process.env.TOKEN_LIFE || keys.tokenLife
        );
        if (!rndExp) {
          logger(
            "[signIn] Could not generate random expired token date... FAILED!"
          );
          throw new Error("Uhh! Something went wrong, please login again!");
        }
        const csrfToken = await generateCSRTTokenWithExp(24, rndExp);
        if (!csrfToken) {
          logger("[signIn] Could not generate csrfToken... FAILED!");
          throw new Error("Could not generate csrfToken!");
        }
        const viewer = code
          ? await signInViaGoogle(code, csrfToken, rndExp, db, res)
          : await signInViaCookie(db, csrfToken, req, res);
        if (!viewer) {
          return { didRequest: true };
        }
        const viewerRes = createViewer(viewer);

        logger("[signIn] generating viewer...");
        return viewerRes;
      } catch (error) {
        logger(`Failed to sign in: ${error}`);

        throw error;
      }
    },
    signInViaEmail: async (
      _root: undefined,
      { email, password }: SignInViaEmailArgs,
      { db, res }: { db: Database; res: Response }
    ) => {
      try {
        logger("[signInViaEmail]", email, password);
        //validate inputs with Yup
        await SignInViaEmailRules.validate(
          { email, password },
          { abortEarly: false }
        );

        const user = await db.users.findOne({ email });
        if (!user) {
          throw new Error("Login failed: Invalid username or password!");
        }
        if (!user.password) {
          throw new Error("Email is already registered!");
        }
        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) {
          throw new Error("Login failed: Invalid username or password!");
        }

        logger("[signInViaEmail] check password... PASSED!");

        const rndExp = generateRandomExpToken(
          process.env.TOKEN_LIFE || keys.tokenLife
        );

        if (!rndExp) {
          logger(
            "[signInViaEmail] Could not generate random expired token date... FAILED!"
          );
          throw new Error("Uhh! Something went wrong, please login again!");
        }
        const csrfToken = await generateCSRTTokenWithExp(24, rndExp);
        if (!csrfToken) {
          logger("[signInViaEmail] Could not generate csrfToken... FAILED!");
          throw new Error("Could not generate csrfToken!");
        }
        const viewerData = {
          _id: user._id.toHexString(),
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          csrfToken,
          provider: LoginProvider.EMAIL,
        };

        const { accessToken, refreshToken } = await generateBothTokens(
          viewerData,
          rndExp
        );

        logger("[signInViaEmail] generate 3 tokens... PASSED!");

        const viewerRes = await db.users.findOneAndUpdate(
          { email },
          {
            $set: {
              accessToken,
              refreshToken,
              csrfToken,
            },
          },
          { returnOriginal: false }
        );

        if (!viewerRes.value) {
          throw new Error("Could not sign you in!");
        }

        res.cookie("accessToken", accessToken, {
          ...cookieOpts,
          maxAge: 60 * 60 * 1000, // 1 hour
        });
        res.cookie("refreshToken", refreshToken, {
          ...cookieOpts,
          maxAge: 365 * 24 * 60 * 60 * 1000, //1 year
        });

        const viewer = createViewer(viewerRes.value);

        logger("[signInViaEmail] generating viewer...", viewer);

        return { data: viewer, errors: null };
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          logger("[signInViaEmail] yup errors", formatYupError(error));
          return {
            data: { didRequest: true },
            errors: formatYupError(error),
          };
        } else {
          logger("[signInViaEmail] error!");
          throw error;
        }
      }
    },
    signOut: (
      _root: undefined,
      _args: {},
      { res }: { res: Response }
    ): Viewer => {
      try {
        res.clearCookie("accessToken", cookieOpts);
        res.clearCookie("refreshToken", cookieOpts);

        logger("[signOut]logging out... PASSED!");

        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to sign out: ${error}`);
      }
    },

    refreshToken: async (
      _root: undefined,
      _args: {},
      { db, req, res }: { db: Database; req: Request; res: Response }
    ): Promise<string | null> => {
      try {
        const currRefreshToken = req.signedCookies.refreshToken;
        //const currAccessToken = req.signedCookies.accessToken;
        const csrfToken = req.get("X-CSRF-TOKEN");
        //logger("[refreshToken] try to refresh token ", refreshToken);
        //logger("[refreshToken] try to csrfToken ", csrfToken);
        if (!currRefreshToken || !csrfToken) {
          logger(
            "[refreshToken] try to refresh token and csrfToken... FAILED!"
          );
          throw new ForbiddenError("Access denied, token missing!");
        }
        logger("[refreshToken] try to refresh token and csrfToken... PASSED!");

        // if (decodedAccessToken.exp >= new Date().getTime() / 1000) {
        //   logger("[refreshToken] access token is still alive... PASSED!");
        //   return null;
        // }
        //decode if refresh token is valid
        const decodedToken = await verifyToken(
          currRefreshToken,
          process.env.SECRET_REFRESH_TOKEN || keys.secretRefreshToken
        );
        logger(
          "[refreshToken] checking csrfToken in headers and access token... PASSED!"
        );
        if (decodedToken.data.csrfToken !== csrfToken) {
          res.clearCookie("accessToken", cookieOpts);
          res.clearCookie("refreshToken", cookieOpts);
          delete req.headers["X-CSRF-TOKEN"];
          logger("[refreshToken] both csrfToken are different... FAILED!");
          logger(decodedToken.data.csrfToken);
          logger(csrfToken);
          throw new AuthenticationError("User is not authenticated!");
        }

        //logger("decode refresh token!", decodedToken);
        //check if refresh token  is in database via user id in token
        const viewer = await authorizeRefreshToken(
          db,
          decodedToken.data.email,
          currRefreshToken
        );
        if (!viewer) {
          res.clearCookie("accessToken", cookieOpts);
          res.clearCookie("refreshToken", cookieOpts);
          delete req.headers["X-CSRF-TOKEN"];
          throw new AuthenticationError(
            "Token is expired, please login again!"
          );
        }

        logger("[refreshToken] generating new csrf and access token...!");

        const rndExp = generateRandomExpToken(
          process.env.TOKEN_LIFE || keys.tokenLife
        );

        if (!rndExp) {
          logger(
            "[refreshToken] Could not generate random expired token date... FAILED!"
          );
          throw new Error("Uhh! Something went wrong, please login again!");
        }

        //generate new csrfToken
        const newCSRFToken = await generateCSRTTokenWithExp(24, rndExp);
        if (!newCSRFToken) {
          logger("[refreshToken] Could not generate csrfToken... FAILED!");
          throw new Error("Could not generate csrfToken!");
        }
        //generate new access token here
        const viewerData = {
          _id: viewer._id.toHexString(),
          first_name: viewer.first_name,
          last_name: viewer.last_name,
          email: viewer.email,
          csrfToken: newCSRFToken,
          provider: viewer.provider,
        };

        const { accessToken, refreshToken } = await generateBothTokens(
          viewerData,
          rndExp
        );

        if (!accessToken) {
          res.clearCookie("accessToken", cookieOpts);
          delete req.headers["X-CSRF-TOKEN"];
          throw new Error("Failed to generate an access token!");
        }

        //set new token to cookie
        res.cookie("accessToken", accessToken, {
          ...cookieOpts,
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
          ...cookieOpts,
          maxAge: 365 * 24 * 60 * 60 * 1000, //1 year
        });
        //update new token and csrfToken
        const updateResult = await db.users.findOneAndUpdate(
          { email: decodedToken.data.email },
          {
            $set: {
              accessToken,
              refreshToken,
              csrfToken: newCSRFToken,
            },
          },
          { returnOriginal: false }
        );
        if (!updateResult.value) {
          res.clearCookie("accessToken", cookieOpts);
          delete req.headers["X-CSRF-TOKEN"];
          throw new Error("Could not generate new token!");
        }
        logger(
          "[refreshToken] new access token has been created and set in cookies! PASSED"
        );
        return newCSRFToken;
      } catch (error) {
        throw error;
      }
    },
  },

  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    },
  },
};
