import { Request } from "express";
import { Database, User } from "../types";
import { ValidationError } from "yup";

export const authorize = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const token = req.get("X-CSRF-TOKEN");
  const viewer = await db.users.findOne({
    _id: req.signedCookies.viewer,
    token,
  });
  return viewer;
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
