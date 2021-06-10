import { gql } from "apollo-boost";

export const LINK_LOCAL_ACCOUNT = gql`
  mutation LinkLocalAccount(
    $email: String
    $password: String
    $confirm_password: String
  ) {
    linkLocalAccount(
      email: $email
      password: $password
      confirm_password: $confirm_password
    ) {
      data
      errors {
        path
        message
      }
    }
  }
`;
