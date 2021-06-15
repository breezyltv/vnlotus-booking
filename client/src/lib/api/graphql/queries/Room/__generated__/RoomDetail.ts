/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RoomType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: RoomDetail
// ====================================================

export interface RoomDetail_room_image {
  __typename: "Pictures";
  main: string;
  collection: string[] | null;
}

export interface RoomDetail_room_host {
  __typename: "HostInfo";
  _id: string;
  displayName: string;
  avatar: string | null;
  email: string;
  phone: string | null;
}

export interface RoomDetail_room {
  __typename: "Room";
  _id: string;
  title: string;
  description: string;
  image: RoomDetail_room_image | null;
  host: RoomDetail_room_host;
  type: RoomType;
  address: string;
  city: string;
  country: string;
  price: number;
  numOfBeds: number;
  numOfBaths: number;
  numOfGuests: number;
  rating: number;
}

export interface RoomDetail {
  room: RoomDetail_room;
}

export interface RoomDetailVariables {
  id: string;
}
