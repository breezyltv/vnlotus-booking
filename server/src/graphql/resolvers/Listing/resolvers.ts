import { IResolvers } from "apollo-server-express";
import { ObjectId } from "bson";

import { Database, Room, Profile } from "../../../lib/types";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Room[]> => {
      return await db.rooms.find({}).toArray();
    },
    profile: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Profile[]> => {
      return await db.profile.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Room> => {
      const deleteHotel = await db.rooms.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteHotel.value) {
        throw new Error("Failed to delete hotel");
      }
      return deleteHotel.value;
    },
  },
  Profile: {
    id: (profile: Profile): string => profile._id.toHexString(),
  },
};
