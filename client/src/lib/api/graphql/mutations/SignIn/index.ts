import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput) {
    signIn(input: $input) {
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
