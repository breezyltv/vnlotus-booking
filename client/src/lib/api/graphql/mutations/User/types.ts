import { gql } from "apollo-boost";

export const UpdateUserInput = gql`
  scalar Date
  input User {
    _id: ID!
    first_name: String!
    last_name: String!
    phone: String
    address: String
    birthday: Date
    #gender: Gender
    bio: String
  }
`;
