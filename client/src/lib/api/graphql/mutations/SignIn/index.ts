import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput) {
    signIn(input: $input) {
      id
      token
      displayName
      avatar
      hasWallet
      didRequest
    }
  }
`;
