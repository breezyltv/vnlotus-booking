import { gql } from "apollo-boost";

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      id
      email
      csrfToken
      displayName
      avatar
      hasWallet
      didRequest
    }
  }
`;
