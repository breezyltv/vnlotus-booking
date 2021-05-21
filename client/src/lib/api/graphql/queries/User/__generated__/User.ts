/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "../../../globalTypes";

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  id: string;
  avatar: string;
  displayName: string;
  first_name: string;
  last_name: string;
  email: string;
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
