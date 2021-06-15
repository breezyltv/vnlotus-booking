import { AuthenticationError, IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import * as yup from "yup";
import { Database, LoginProvider, User } from "../../../lib/types";
import { formatYupError, logger } from "../../../lib/utils";
import { authorizeAccessToken, hashPassword } from "../../../lib/auth";
import {
  IUserArgs,
  IUserUpdateArgs,
  IUserUpdateReturnType,
  IUserBookingArgs,
  IUserBookingsData,
  IUserRoomsArgs,
  IUserRoomsData,
  ILinkLocalAccountArgs,
  ILinkLocalAccount,
} from "./types";
import { Request } from "express";
import {
  UserUpdateRules,
  LinkLocalAccountRules,
} from "../../../lib/validations/";

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: IUserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        // check if request is authorized
        const viewer = await authorizeAccessToken(db, req);

        if (!viewer) {
          throw new AuthenticationError(
            "This request is not authorized to perform this operation!"
          );
        }

        if (viewer && viewer._id.toHexString() === id) {
          viewer.authorized = true;
        } else {
          throw new Error("No matching user found!");
        }

        // const user = await db.users.findOne({ _id: new ObjectId(id) });

        // if (!user) {
        //   throw new Error("No matching user found!");
        // }

        // if (viewer && viewer._id === user._id) {
        //   user.authorized = true;
        // } else {
        //   throw new AuthenticationError(
        //     "This request is not authorized to perform this operation!"
        //   );
        // }
        //logger("[User] viewer", viewer);
        //logger("[User] UserInputs", user);
        return viewer;
      } catch (error) {
        logger("[User] Failed to query user!", error);
        throw error;
      }
    },
  },
  Mutation: {
    updateUser: async (
      _root: undefined,
      { user }: IUserUpdateArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<IUserUpdateReturnType> => {
      //logger(user);
      try {
        //check if birthday is different the default
        const birthday =
          user.birthday &&
          new Date(user.birthday).valueOf() > new Date(1940, 0, 1).valueOf()
            ? user.birthday
            : null;

        // check if request is authorized
        const viewer = await authorizeAccessToken(db, req);
        if (!viewer) {
          throw new Error(`This request is not authorized!`);
        }
        //validate inputs with Yup
        await UserUpdateRules.validate(user, { abortEarly: false });
        //logger("[updateUser] viewer", viewer);
        //logger("[updateUser] userUpdateInputs", user);
        let updateUserData: any = {
          first_name: user.first_name?.trim(),
          last_name: user.last_name?.trim(),
          phone: user.phone,
          address: user.address?.trim(),
          birthday: birthday,
          bio: user.bio?.trim(),
        };
        if (user.gender?.trim()) {
          updateUserData = {
            ...updateUserData,
            gender: user.gender,
          };
        }
        const updateResult = await db.users.findOneAndUpdate(
          {
            _id: new ObjectId(user._id),
          },
          {
            $set: updateUserData,
          },
          { returnOriginal: false }
        );
        if (!updateResult.value) {
          throw new Error("Failed to update user profile");
        }
        //logger(updateResult.value);

        return {
          data: updateResult.value,
          errors: null,
        };
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          logger("yup errors", formatYupError(error));
          return {
            data: null,
            errors: formatYupError(error),
          };
        } else {
          logger("[updateUser] errors");
          throw error;
        }
      }
    },
    linkLocalAccount: async (
      _root: undefined,
      { email, password, confirm_password }: ILinkLocalAccountArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<ILinkLocalAccount> => {
      try {
        const viewer = await authorizeAccessToken(db, req);
        if (!viewer) {
          throw new AuthenticationError(`This request is not authorized!`);
        }
        //check if email is the same
        if (email !== viewer.email) {
          throw new AuthenticationError(`This request is not authorized!`);
        }
        if (viewer.provider !== LoginProvider.EMAIL) {
          throw new Error(`You are currently signed in with a local account!`);
        }

        //validate with Yup
        await LinkLocalAccountRules.validate(
          { email, password, confirm_password },
          { abortEarly: false }
        );

        //hash password
        const encrypt = await hashPassword(password);

        //update local account

        const updateUser = await db.users.findOneAndUpdate(
          { email },
          {
            $set: {
              password: encrypt,
              linkAccount: {
                email: LoginProvider.EMAIL,
              },
            },
          },
          {
            returnOriginal: true,
          }
        );

        if (!updateUser.value) {
          throw new Error("Could not link to local account!");
        }

        return { data: true, errors: null };
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          logger("yup errors", formatYupError(error));
          return {
            data: false,
            errors: formatYupError(error),
          };
        } else {
          logger("[updateUser] errors");
          throw error;
        }
      }
    },
  },
  User: {
    id: (user: User): string => {
      return user._id.toHexString();
    },
    hasWallet: (user: User): boolean => {
      return Boolean(user.walletId);
    },
    income: (user: User): number | null => {
      return user.authorized ? user.income : null;
    },
    bookings: async (
      user: User,
      { limit, page }: IUserBookingArgs,
      { db }: { db: Database }
    ): Promise<IUserBookingsData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }
        const data: IUserBookingsData = {
          total: 0,
          result: [],
        };
        let cursor = await db.bookings.find({
          _id: { $in: user.bookings },
        });
        //Example : page = 1; limit = 10, cursor starts at 0
        //Example : page = 2; limit = 10, cursor starts at 10
        cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);
        data.total = await cursor.count();
        data.result = await cursor.toArray();
        return data;
      } catch (error) {
        throw new Error(`Failed to query user's bookings: ${error}`);
      }
    },
    rooms: async (
      user: User,
      { limit, page }: IUserRoomsArgs,
      { db }: { db: Database }
    ): Promise<IUserRoomsData | null> => {
      try {
        const data: IUserRoomsData = {
          total: 0,
          result: [],
        };
        //query all rooms which associates with user collection
        let cursor = await db.rooms.find({
          _id: { $in: user.rooms },
        });
        //Example : page = 1; limit = 10, cursor starts at 0
        //Example : page = 2; limit = 10, cursor starts at 10
        cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);
        data.total = await cursor.count();
        data.result = await cursor.toArray();
        return data;
      } catch (error) {
        throw new Error(`Failed to query user's rooms: ${error}`);
      }
    },
  },
};
