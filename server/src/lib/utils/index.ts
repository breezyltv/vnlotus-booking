import { ForbiddenError, AuthenticationError } from "apollo-server-express";

import { ValidationError } from "yup";

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

export const logger = (messages?: any, ...params: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(messages, ...params);
  }
};

export const handleApolloErrors = (err: any) => {
  if (err instanceof AuthenticationError || err instanceof ForbiddenError) {
    return err;
  }
  return null;
};
