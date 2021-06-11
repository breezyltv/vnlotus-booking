/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignInViaEmail
// ====================================================

export interface SignInViaEmail_signInViaEmail_data {
  __typename: "Viewer";
  id: string | null;
  email: string | null;
  csrfToken: string | null;
  displayName: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}

export interface SignInViaEmail_signInViaEmail_errors {
  __typename: "YupError";
  path: string;
  message: string;
}

export interface SignInViaEmail_signInViaEmail {
  __typename: "SignInViaEmailGQLType";
  data: SignInViaEmail_signInViaEmail_data;
  errors: SignInViaEmail_signInViaEmail_errors[] | null;
}

export interface SignInViaEmail {
  signInViaEmail: SignInViaEmail_signInViaEmail | null;
}

export interface SignInViaEmailVariables {
  email?: string | null;
  password?: string | null;
}
