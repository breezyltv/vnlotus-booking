/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser_register_data {
  __typename: "Viewer";
  id: string | null;
  email: string | null;
  csrfToken: string | null;
  displayName: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}

export interface RegisterUser_register_errors {
  __typename: "YupError";
  path: string;
  message: string;
}

export interface RegisterUser_register {
  __typename: "RegisterGQLType";
  data: RegisterUser_register_data;
  errors: RegisterUser_register_errors[] | null;
}

export interface RegisterUser {
  register: RegisterUser_register;
}

export interface RegisterUserVariables {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  password?: string | null;
  confirm_password?: string | null;
}
