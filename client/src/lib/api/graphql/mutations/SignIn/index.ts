import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput) {
    signIn(input: $input) {
      id
      csrfToken
      displayName
      avatar
      hasWallet
      didRequest
    }
  }
`;
