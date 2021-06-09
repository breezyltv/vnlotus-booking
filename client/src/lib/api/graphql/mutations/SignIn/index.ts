import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput) {
    signIn(input: $input) {
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
