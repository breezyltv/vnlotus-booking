import { gql } from "apollo-boost";

export const SIGN_IN_VIA_EMAIL = gql`
  mutation SignInViaEmail($email: String, $password: String) {
    signInViaEmail(email: $email, password: $password) {
      data {
        id
        email
        csrfToken
        displayName
        avatar
        hasWallet
        didRequest
      }
      errors {
        path
        message
      }
    }
  }
`;
