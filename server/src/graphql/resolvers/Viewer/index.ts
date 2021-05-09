import crypto from "crypto";
import { IResolvers } from "apollo-server-express";
import { Database, Viewer, User, LoginProvider } from "../../../lib/types";
import { Google } from "../../../lib/api/Google";
import { SignInArgs } from "./types";
import { Response, Request } from "express";
const cookieOpts = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true,
};

const signInViaGoogle = async (
  code: string,
  token: string,
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

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token,
      },
    },
    { returnOriginal: false }
  );
  let viewer = updateRes.value;
  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      displayName: userName,
      first_name: firstName,
      last_name: lastName,
      provider: LoginProvider.Google,
      avatar: userAvatar,
      contact: userEmail,
      income: 0,
      bookings: [],
      rooms: [],
    });
    viewer = insertResult.ops[0];
  }
  //set user id to cookie
  res.cookie("viewer", userId, {
    ...cookieOpts,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  return viewer;
};

const signInViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<User | undefined> => {
  const updateRes = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token } },
    { returnOriginal: false }
  );

  let viewer = updateRes.value;
  if (!viewer) {
    res.clearCookie("viewer", cookieOpts);
  }
  return viewer;
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
    signIn: async (
      _root: undefined,
      { input }: SignInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ) => {
      try {
        const code = input ? input.code : null;
        //create token every time sign in
        const token = crypto.randomBytes(16).toString("hex");

        const viewer = code
          ? await signInViaGoogle(code, token, db, res)
          : await signInViaCookie(token, db, req, res);
        if (!viewer) {
          return { didRequest: true };
        }
        return {
          _id: viewer._id,
          token: viewer.token,
          displayName: viewer.displayName,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`Failed to sign in: ${error}`);
      }
    },
    signOut: (
      _root: undefined,
      _args: {},
      { res }: { res: Response }
    ): Viewer => {
      console.log("try to log out!");

      try {
        res.clearCookie("viewer", cookieOpts);
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to sign out: ${error}`);
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
