/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatingUser
// ====================================================

export interface UpdatingUser_updateUser_data {
  __typename: "User";
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  birthday: any | null;
  gender: Gender | null;
  bio: string | null;
}

export interface UpdatingUser_updateUser_errors {
  __typename: "YupError";
  path: string;
  message: string;
}

export interface UpdatingUser_updateUser {
  __typename: "UserUpdateGQLReturnType";
  data: UpdatingUser_updateUser_data | null;
  errors: UpdatingUser_updateUser_errors[] | null;
}

export interface UpdatingUser {
  updateUser: UpdatingUser_updateUser | null;
}

export interface UpdatingUserVariables {
  _id: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  birthday?: any | null;
  gender?: Gender | null;
  address?: string | null;
  bio?: string | null;
}
