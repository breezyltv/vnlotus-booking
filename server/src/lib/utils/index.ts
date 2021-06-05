import { ForbiddenError, AuthenticationError } from "apollo-server-express";
import { Request } from "express";
import util from "util";
import { Database, User, TokenUserData, ITokenUser } from "../types";
import { ValidationError } from "yup";
import jwt from "jsonwebtoken";
import { keys } from "../config/keys";

const debuglog = util.debuglog("app");

export const authorizeAccessToken = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const accessToken = req.get("X-CSRF-TOKEN");
  console.log("get X-CSRF-TOKEN...", accessToken ? "True" : "False");
  debuglog("get X-CSRF-TOKEN...", [accessToken ? "True" : "False"]);

  if (accessToken) {
    const decodedToken = await verifyToken(
      accessToken,
      process.env.SECRET || keys.secretKey
    );
    debuglog("decode X-CSRF-TOKEN...", [decodedToken ? "True" : "False"]);
    const viewer = await db.users.findOne({
      _id: decodedToken.data._id,
      accessToken,
    });
    console.log(
      "[authorizeAccessToken] get viewer...",
      viewer ? "True" : "False"
    );

    return viewer;
  }
  return null;
};

export const authorizeRefreshToken = async (
  db: Database,
  userId: string,
  refreshToken: string
): Promise<User | null> => {
  const viewer = await db.users.findOne({
    _id: userId,
    refreshToken,
  });
  console.log(
    "[authorizeToken]: check id and refresh token in database...",
    viewer ? "True" : "False"
  );

  if (!viewer) {
    return null;
  }

  return viewer;
};

export const generateToken = (
  user: TokenUserData,
  secretSignature: string,
  tokenLife: string
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    // const userData = {
    //   _id: user._id,
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   email: user.email,
    //   provider: user.provider,
    // };

    jwt.sign(
      { data: user },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

export const verifyToken = async (
  token: string,
  secretKey: string
): Promise<ITokenUser> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        //console.log("decoded token is error: ", error);

        return reject(error);
      }
      resolve(decoded as ITokenUser);
    });
  });
};

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = [];
  err.inner.forEach((e) => {
    errors.push({
      path: e.path ? e.path : "",
      message: e.message,
    });
  });

  return errors;
};

export const handleApolloErrors = (err: any) => {
  if (err instanceof AuthenticationError || err instanceof ForbiddenError) {
    return err;
  }
  return null;
};
