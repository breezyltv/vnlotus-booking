/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginType, Gender } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_linkAccount {
  __typename: "ILinkLocalAccount";
  google: LoginType | null;
  email: LoginType | null;
}

export interface User_user {
  __typename: "User";
  id: string;
  avatar: string | null;
  displayName: string;
  first_name: string;
  last_name: string;
  email: string;
  provider: LoginType;
  linkAccount: User_user_linkAccount;
  phone: string | null;
  address: string | null;
  birthday: any | null;
  gender: Gender | null;
  bio: string | null;
  hasWallet: boolean;
  income: number | null;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
}
