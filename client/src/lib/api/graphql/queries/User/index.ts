import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      avatar
      displayName
      first_name
      last_name
      email
      provider
      linkAccount {
        google
        email
      }
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
