import { IResolvers } from "apollo-server-express";
import { Database, Profile } from "../../../lib/types";
export const profileResolvers: IResolvers = {
  Query: {
    profile: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Profile[]> => {
      return await db.profile.find({}).toArray();
    },
  },

  Profile: {
    id: (profile: Profile): string => profile._id.toHexString(),
  },
};
