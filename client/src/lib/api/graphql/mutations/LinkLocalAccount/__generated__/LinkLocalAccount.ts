/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LinkLocalAccount
// ====================================================

export interface LinkLocalAccount_linkLocalAccount_errors {
  __typename: "YupError";
  path: string;
  message: string;
}

export interface LinkLocalAccount_linkLocalAccount {
  __typename: "linkLocalAccountGQLType";
  data: boolean;
  errors: LinkLocalAccount_linkLocalAccount_errors[] | null;
}

export interface LinkLocalAccount {
  linkLocalAccount: LinkLocalAccount_linkLocalAccount | null;
}

export interface LinkLocalAccountVariables {
  email?: string | null;
  password?: string | null;
  confirm_password?: string | null;
}
