import { gql } from "apollo-boost";

export const REGISTER = gql`
  mutation RegisterUser(
    $email: String
    $first_name: String
    $last_name: String
    $password: String
    $confirm_password: String
  ) {
    register(
      user: {
        email: $email
        first_name: $first_name
        last_name: $last_name
        password: $password
        confirm_password: $confirm_password
      }
    ) {
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
