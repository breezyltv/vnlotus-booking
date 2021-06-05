/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_signIn {
  __typename: "Viewer";
  id: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  displayName: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}

export interface SignIn {
  signIn: SignIn_signIn;
}

export interface SignInVariables {
  input?: SignInInput | null;
}
