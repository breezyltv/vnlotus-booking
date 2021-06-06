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
  const csrfToken = req.get("X-CSRF-TOKEN");
  const accessToken = req.signedCookies.accessToken;
  console.log(
    "[authorizeAccessToken] get X-CSRF-TOKEN...",
    csrfToken ? "PASSED" : "FAILED"
  );
  console.log(
    "[authorizeAccessToken] get access token in headers...",
    csrfToken ? "PASSED" : "FAILED"
  );
  debuglog(
    "[authorizeAccessToken]get X-CSRF-TOKEN...",
    csrfToken ? "PASSED" : "FAILED"
  );

  if (accessToken && csrfToken) {
    const decodedToken = await verifyToken(
      accessToken,
      process.env.SECRET || keys.secretKey
    );
    debuglog("[authorizeAccessToken] decode accessToken...", [
      decodedToken ? "PASSED" : "FAILED",
    ]);
    const viewer = await db.users.findOne({
      _id: decodedToken.data._id,
      accessToken,
      csrfToken,
    });
    if (!viewer) {
      return null;
    }
    console.log(
      "[authorizeAccessToken] get viewer...",
      viewer ? "PASSED" : "FAILED"
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
    "[authorizeRefreshToken]: check id and refresh token in database...",
    viewer ? "PASSED" : "FAILED"
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
