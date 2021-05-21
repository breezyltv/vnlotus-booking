import { gql } from "apollo-boost";

export const UPDATING_USER = gql`
  mutation UpdatingUser(
    $_id: ID!
    $first_name: String!
    $last_name: String!
    $phone: String
    $birthday: Date
    $gender: Gender
    $address: String
    $bio: String
  ) {
    updateUser(
      user: {
        _id: $_id
        first_name: $first_name
        last_name: $last_name
        phone: $phone
        birthday: $birthday
        gender: $gender
        address: $address
        bio: $bio
      }
    ) {
      data {
        first_name
        last_name
        phone
        address
        birthday
        gender
        bio
      }
      errors {
        path
        message
      }
    }
  }
`;
