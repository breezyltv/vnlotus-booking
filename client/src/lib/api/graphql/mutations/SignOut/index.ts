import { gql } from "apollo-boost";

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      id
      token
      displayName
      avatar
      hasWallet
      didRequest
    }
  }
`;
