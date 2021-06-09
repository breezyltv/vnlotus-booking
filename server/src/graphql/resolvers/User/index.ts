import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import * as yup from "yup";
import { Database, User } from "../../../lib/types";
import { formatYupError } from "../../../lib/utils";
import { authorizeAccessToken } from "../../../lib/auth";
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
        // check if request is authorized
        const viewer = await authorizeAccessToken(db, req);
        if (!viewer) {
          throw new Error(
            "This request is not authorized to perform this operation!"
          );
        }
        const user = await db.users.findOne({ _id: new ObjectId(id) });
        if (!user) {
          throw new Error("No matching user found!");
        }

        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }
        //console.log("[User] viewer", viewer);
        //console.log("[User] UserInputs", user);
        return user;
      } catch (error) {
        console.log("[User] Failed to query user!");
        throw error;
      }
    },
  },
  Mutation: {
    updateUser: async (
      _root: undefined,
      { user }: UserUpdateArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<UserUpdateReturnType> => {
      //console.log(user);
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
        //console.log("[updateUser] viewer", viewer);
        //console.log("[updateUser] userUpdateInputs", user);
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
        //console.log(updateResult.value);

        return {
          data: updateResult.value,
          errors: null,
        };
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log("yup errors", formatYupError(error));
          return {
            data: null,
            errors: formatYupError(error),
          };
        } else {
          console.log("[updateUser] errors");
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
        throw new Error(`Failed to query user's bookings: ${error}`);
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
