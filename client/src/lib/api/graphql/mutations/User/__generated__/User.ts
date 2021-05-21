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
  displayName: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  birthday: any | null;
  gender: Gender | null;
  bio: string | null;
}

export interface YupError {
  path: string;
  message: string;
}

export interface UserUpdate_userUpdate {
  data: User_user | null;
  errors: YupError[] | null;
}

export interface UserUpdateReturnType {
  updateUser: UserUpdate_userUpdate;
}

export interface UserUpdate {
  _id: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  address?: string | null;
  birthday?: any | null;
  gender?: Gender | null;
  bio?: string | null;
}

export interface UpdateUserVariables {
  user: UserUpdate;
}
