import merge from "lodash.merge";
import { viewerResolvers } from "./Viewer";
import { profileResolvers } from "./Profile";
import { userResolvers } from "./User";
import { roomResolvers } from "./Room";

export const resolvers = merge(
  viewerResolvers,
  profileResolvers,
  userResolvers,
  roomResolvers
);
