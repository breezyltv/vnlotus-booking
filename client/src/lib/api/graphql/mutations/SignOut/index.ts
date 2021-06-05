import { gql } from "apollo-boost";

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      id
      accessToken
      refreshToken
      displayName
      avatar
      hasWallet
      didRequest
    }
  }
`;
