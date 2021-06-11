/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginType, Gender, RoomType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: UserListing
// ====================================================

export interface UserListing_user_bookings_result_room_image {
  __typename: "Pictures";
  main: string;
}

export interface UserListing_user_bookings_result_room {
  __typename: "Room";
  _id: string;
  title: string;
  image: UserListing_user_bookings_result_room_image | null;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface UserListing_user_bookings_result {
  __typename: "Booking";
  _id: string;
  room: UserListing_user_bookings_result_room;
}

export interface UserListing_user_bookings {
  __typename: "Bookings";
  total: number;
  result: UserListing_user_bookings_result[];
}

export interface UserListing_user_rooms_result_image {
  __typename: "Pictures";
  main: string;
  collection: string[] | null;
}

export interface UserListing_user_rooms_result {
  __typename: "Room";
  _id: string;
  title: string;
  image: UserListing_user_rooms_result_image | null;
  type: RoomType;
  price: number;
  numOfBeds: number;
  numOfBaths: number;
  numOfGuests: number;
  rating: number;
}

export interface UserListing_user_rooms {
  __typename: "Rooms";
  total: number;
  result: UserListing_user_rooms_result[];
}

export interface UserListing_user {
  __typename: "User";
  id: string;
  avatar: string | null;
  displayName: string;
  first_name: string;
  last_name: string;
  email: string;
  provider: LoginType;
  phone: string | null;
  address: string | null;
  birthday: any | null;
  gender: Gender | null;
  bio: string | null;
  hasWallet: boolean;
  income: number | null;
  bookings: UserListing_user_bookings | null;
  rooms: UserListing_user_rooms;
}

export interface UserListing {
  user: UserListing_user;
}

export interface UserListingVariables {
  id: string;
  bookingsPage: number;
  listingsPage: number;
  limit: number;
}
