import { Request } from "express";
import crypto from "crypto";
import { argon2i } from "argon2-ffi";
import jwt from "jsonwebtoken";
import { keys } from "../config/keys";
import { logger } from "../utils/";
import { Database, User, TokenUserData, ITokenUser } from "../types";
import util from "util";
import base64url from "base64url";
import { ForbiddenError } from "apollo-server-errors";

export const getRandomBytes = util.promisify(crypto.randomBytes);

type IBothTokens = {
  accessToken: string;
  refreshToken: string;
};

export const generateRandomExpToken = (exp: string | number) => {
  try {
    //create random exp time to generate different base64 code every time
    const rndOp = Math.floor(Math.random() * 2);
    const rnd = Math.floor(Math.random() * 100);
    const formatExp = typeof exp === "string" ? parseInt(exp) : exp;
    const rndExp = rndOp ? formatExp - rnd : formatExp + rnd;
    const finalExp = new Date().getTime() + rndExp;
    logger("[generateRandomExpToken] custom expired token: ", finalExp);
    return finalExp;
  } catch (error) {
    logger("[generateRandomExpToken] errors");
  }
};

export const generateCSRTTokenWithExp = async (
  lenToken: number,
  exp: string | number
) => {
  try {
    const csrfToken = await getRandomBytes(lenToken);

    const expEncoded = base64url.encode(JSON.stringify({ exp }));

    const finalCode = csrfToken.toString("hex") + "." + expEncoded;

    logger("[generateCSRTTokenWithExp] generated csrfToken... PASSED");

    return finalCode;
  } catch (error) {
    logger("[generateCSRTTokenWithExp] errors");
    return undefined;
  }
};

export const authorizeAccessToken = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const csrfToken = req.get("X-CSRF-TOKEN");
  const accessToken = req.signedCookies.accessToken;
  logger(
    "[authorizeAccessToken] get X-CSRF-TOKEN in headers...",
    csrfToken ? "PASSED" : "FAILED"
  );
  logger(
    "[authorizeAccessToken] get access token in cookie...",
    accessToken ? "PASSED" : "FAILED"
  );

  if (!csrfToken || !accessToken) {
    throw new ForbiddenError("Access denied, token missing!");
  }

  if (accessToken && csrfToken) {
    const decodedToken = await verifyToken(
      accessToken,
      process.env.SECRET || keys.secretKey
    );

    const viewer = await db.users.findOne({
      email: decodedToken.data.email,
      accessToken,
      csrfToken,
    });
    if (!viewer) {
      return null;
    }
    logger(
      "[authorizeAccessToken] get viewer...",
      viewer ? "PASSED" : "FAILED"
    );

    return viewer;
  }
  return null;
};

export const authorizeRefreshToken = async (
  db: Database,
  email: string,
  refreshToken: string
): Promise<User | null> => {
  const viewer = await db.users.findOne({
    email,
    refreshToken,
  });
  logger(
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
  tokenLife: string | number
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
        //logger("decoded token is error: ", error);

        return reject(error);
      }
      resolve(decoded as ITokenUser);
    });
  });
};

export const generateBothTokens = async (
  viewerData: TokenUserData,
  accessTokenExp: number
): Promise<IBothTokens> => {
  try {
    const accessToken = await generateToken(
      viewerData,
      process.env.SECRET || keys.secretKey,
      accessTokenExp
    );
    const refreshToken = await generateToken(
      viewerData,
      process.env.SECRET_REFRESH_TOKEN || keys.secretRefreshToken,
      process.env.REFRESH_TOKEN_LIFE || keys.refreshTokenLife
    );
    if (!accessToken || !refreshToken) {
      logger(
        "[generateBothTokens] generate access and refresh token... FAILED!"
      );
      throw new Error("Could not generate access and refresh token.!");
    }
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return error;
  }
};

export const hashPassword = async (password: string) => {
  try {
    const salt = await getRandomBytes(32);
    //const hashedPassword = await argon2i.hash(password, salt);
    return argon2i.hash(password, salt);
  } catch (error) {
    logger("Error hashing password with argon2", error);
    throw new Error("Error hashing password with argon2 !");
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const pass = Buffer.from(password);
    const correct = await argon2i.verify(hashedPassword, pass);
    if (correct) {
      return true;
    }
    return false;
  } catch (error) {
    logger("Error argon2 verification", error);
    throw new Error("Error argon2 verification !");
  }
};
