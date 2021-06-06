import { gql } from "apollo-boost";

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      id
      csrfToken
      displayName
      avatar
      hasWallet
      didRequest
    }
  }
`;
