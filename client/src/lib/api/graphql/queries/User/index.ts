import { gql } from "apollo-boost";

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      avatar
      displayName
      first_name
      last_name
      email
      phone
      address
      birthday
      gender
      bio
      hasWallet
      income
    }
  }
`;
