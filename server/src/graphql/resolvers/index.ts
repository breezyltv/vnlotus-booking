import merge from "lodash.merge";
import { viewerResolvers } from "./Viewer";
import { profileResolvers } from "./Profile";

export const resolvers = merge(viewerResolvers, profileResolvers);
