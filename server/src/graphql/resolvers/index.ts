import merge from "lodash.merge";
import { viewerResolvers } from "./Viewer";
import { profileResolvers } from "./Profile";
import { userResolvers } from "./User";

export const resolvers = merge(
  viewerResolvers,
  profileResolvers,
  userResolvers
);
