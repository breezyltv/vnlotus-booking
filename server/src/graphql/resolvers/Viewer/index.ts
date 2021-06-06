import crypto from "crypto";
import * as yup from "yup";
import {
  IResolvers,
  ForbiddenError,
  AuthenticationError,
} from "apollo-server-express";
import { Database, Viewer, User, LoginProvider } from "../../../lib/types";
import {
  authorizeRefreshToken,
  formatYupError,
  generateToken,
  verifyToken,
} from "../../../lib/utils";
import { keys } from "../../../lib/config/keys";
import { Google } from "../../../lib/api/Google";
import { SignInArgs, RegisterArgs } from "./types";
import { Response, Request } from "express";
import { RegisterRules } from "../../../lib/validations/registerValid";
import jwt from "jsonwebtoken";
const cookieOpts = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true,
};

const signInViaGoogle = async (
  code: string,
  csrfToken: string,
  db: Database,
  res: Response
): Promise<User | undefined> => {
  const { user } = await Google.signIn(code);
  console.log(user);

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
  console.log("generated accessToken and refreshToken...");
  const viewerData = {
    _id: userId,
    first_name: firstName,
    last_name: lastName,
    email: userEmail,
    csrfToken,
    provider: LoginProvider.GOOGLE,
  };
  const accessToken = await generateToken(
    viewerData,
    process.env.SECRET || keys.secretKey,
    process.env.TOKEN_LIFE || keys.tokenLife
  );
  const refreshToken = await generateToken(
    viewerData,
    process.env.SECRET_REFRESH_TOKEN || keys.secretRefreshToken,
    process.env.REFRESH_TOKEN_LIFE || keys.refreshTokenLife
  );

  if (!accessToken || !refreshToken) {
    throw new Error("Could not generate token!");
  }
  //check if user already exists
  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        displayName: userName,
        avatar: userAvatar,
        email: userEmail,
        accessToken,
        refreshToken,
        csrfToken,
      },
    },
    { returnOriginal: false }
  );
  let viewer = updateRes.value;
  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
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
    });
    viewer = insertResult.ops[0];
  }

  //set access tokens to cookie
  res.cookie("accessToken", accessToken, {
    ...cookieOpts,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOpts,
    maxAge: 365 * 24 * 60 * 60 * 1000,
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
    //console.log("login via cookie", accessToken);
    //const tokenInHeaders =  req.get("X-CSRF-TOKEN");
    if (!accessToken) {
      return null;
    }

    const decodedToken = await verifyToken(
      accessToken,
      process.env.SECRET || keys.secretKey
    );

    //console.log("decode and check access token is expired", decodedToken);
    if (!decodedToken) {
      return null;
    }

    //check if access token is the same in cookie, don't need update new access token
    //if(accessToken !== tokenInHeaders){

    let viewer = await db.users.findOne({ _id: decodedToken.data._id });

    //const viewer = updateResult.value;
    if (!viewer) {
      res.clearCookie("accessToken", cookieOpts);
      res.clearCookie("refreshToken", cookieOpts);
      return null;
    }

    return viewer;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("accessToken is expired!");
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
      { db, req, res }: { db: Database; req: Request; res: Response }
    ) => {
      console.log(user);
      try {
        //validate inputs with Yup
        await RegisterRules.validate(user, { abortEarly: false });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log("yup errors", formatYupError(error));
          return {
            data: null,
            errors: formatYupError(error),
          };
        } else {
          console.log("Apollo graphql errors");
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
        const csrfToken = crypto.randomBytes(16).toString("hex");

        const viewer = code
          ? await signInViaGoogle(code, csrfToken, db, res)
          : await signInViaCookie(db, csrfToken, req, res);
        if (!viewer) {
          return { didRequest: true };
        }
        return {
          _id: viewer._id,
          csrfToken: viewer.csrfToken,
          displayName: viewer.displayName,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          provider: viewer.provider,
          didRequest: true,
        };
      } catch (error) {
        //Handle AuthenticationError return from signInViaCookie method
        if (
          error instanceof AuthenticationError ||
          error instanceof ForbiddenError
        ) {
          throw error;
        }
        throw new Error(`Failed to sign in: ${error}`);
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
        console.log("try to log out... PASSED!");
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
        const refreshToken = req.signedCookies.refreshToken;

        const csrfToken = req.get("X-CSRF-TOKEN");
        //console.log("[refreshToken] try to refresh token ", refreshToken);
        //console.log("[refreshToken] try to csrfToken ", csrfToken);
        if (!refreshToken || !csrfToken) {
          console.log(
            "[refreshToken] try to refresh token and csrfToken... FAILED!"
          );
          throw new ForbiddenError("Access denied, token missing!");
        }
        console.log(
          "[refreshToken] try to refresh token and csrfToken... PASSED!"
        );
        //decode if refresh token is valid
        const decodedToken = await verifyToken(
          refreshToken,
          process.env.SECRET_REFRESH_TOKEN || keys.secretRefreshToken
        );

        if (decodedToken.data.csrfToken !== csrfToken) {
          throw new ForbiddenError("Access denied, token missing!");
        }
        console.log(
          "[refreshToken] checking csrfToken in headers and in access token... PASSED!"
        );

        //console.log("decode refresh token!", decodedToken);
        //check if refresh token  is in database via user id in token
        const viewer = await authorizeRefreshToken(
          db,
          decodedToken.data._id,
          refreshToken
        );
        if (!viewer) {
          res.clearCookie("accessToken", cookieOpts);
          res.clearCookie("refreshToken", cookieOpts);
          throw new AuthenticationError(
            "Token is expired, please login again!"
          );
        }

        console.log("[refreshToken] generating new csrf and access token...!");

        //generate new csrfToken
        const newCSRFToken = crypto.randomBytes(16).toString("hex");

        //generate new access token here
        const accessToken = await generateToken(
          {
            _id: viewer._id,
            first_name: viewer.first_name,
            last_name: viewer.last_name,
            email: viewer.email,
            csrfToken: newCSRFToken,
            provider: viewer.provider,
          },
          process.env.SECRET || keys.secretKey,
          process.env.TOKEN_LIFE || keys.tokenLife
        );
        if (!accessToken) {
          throw new Error("Failed to generate an access token!");
        }

        //set new token to cookie
        res.cookie("accessToken", accessToken, {
          ...cookieOpts,
          maxAge: 365 * 24 * 60 * 60 * 1000,
        });
        //update new token and csrfToken
        let updateResult = await db.users.findOneAndUpdate(
          { _id: decodedToken.data._id },
          {
            $set: {
              accessToken,
              csrfToken,
            },
          },
          { returnOriginal: false }
        );
        if (!updateResult.value) {
          res.clearCookie("accessToken", cookieOpts);
          throw new Error("Could not generate new token!");
        }
        console.log(
          "[refreshToken] new access token has been created and set in cookies! PASSED"
        );
        return csrfToken;
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
