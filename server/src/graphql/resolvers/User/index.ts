import { IResolvers } from "apollo-server-express";
//import { UserInputError } from 'apollo-server';
import * as yup from "yup";
import { Database, User, YupError } from "../../../lib/types";
import { authorize, formatYupError } from "../../../lib/utils";
import {
  UserArgs,
  UserUpdateArgs,
  UserUpdateReturnType,
  UserBookingArgs,
  UserBookingsData,
  UserRoomsArgs,
  UserRoomsData,
} from "./types";
import { Request } from "express";
import { UserUpdateRules } from "../../../lib/validations/userValid";

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });
        if (!user) {
          throw new Error("User can't be found");
        }
        // check if request is authorized
        const viewer = await authorize(db, req);
        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  Mutation: {
    updateUser: async (
      _root: undefined,
      { user }: UserUpdateArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<UserUpdateReturnType> => {
      console.log(user);

      const birthday =
        user.birthday &&
        new Date(user.birthday).valueOf() > new Date(1940, 0, 1).valueOf()
          ? user.birthday
          : null;

      try {
        await UserUpdateRules.validate(user, { abortEarly: false });
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

      const updateResult = await db.users.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $set: {
            first_name: user.first_name?.trim(),
            last_name: user.last_name?.trim(),
            phone: user.phone,
            address: user.address?.trim(),
            birthday: birthday,
            gender: user.gender,
            bio: user.bio?.trim(),
          },
        },
        { returnOriginal: false }
      );
      if (!updateResult.value) {
        throw new Error("Failed to update user profile");
      }
      console.log(updateResult.value);

      return {
        data: updateResult.value,
        errors: null,
      };
    },
  },
  User: {
    id: (user: User): string => {
      return user._id;
    },
    hasWallet: (user: User): boolean => {
      return Boolean(user.walletId);
    },
    income: (user: User): number | null => {
      return user.authorized ? user.income : null;
    },
    bookings: async (
      user: User,
      { limit, page }: UserBookingArgs,
      { db }: { db: Database }
    ): Promise<UserBookingsData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }
        const data: UserBookingsData = {
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
        throw new Error(`Failed to query bookings: ${error}`);
      }
    },
    rooms: async (
      user: User,
      { limit, page }: UserRoomsArgs,
      { db }: { db: Database }
    ): Promise<UserRoomsData | null> => {
      try {
        const data: UserRoomsData = {
          total: 0,
          result: [],
        };
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
        throw new Error(`Failed to query rooms: ${error}`);
      }
    },
  },
};
