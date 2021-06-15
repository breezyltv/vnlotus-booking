import { Booking, Room } from "../../../lib/types";
export interface RoomArgs {
  id: string;
}

export interface RoomBookingArgs {
  limit: number;
  page: number;
}

export interface RoomBookingData {
  total: number;
  result: Booking[];
}
export enum RoomsFilter {
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
}

export interface RoomsByLocationArgs {
  location: string;
  filter: RoomsFilter;
  limit: number;
  page: number;
}

export interface RoomsData {
  region: string | null;
  total: number;
  result: Room[];
}

export interface RoomsQuery {
  country?: string;
  admin?: string;
  city?: string;
}

export interface IRoomHostInfo {
  _id: string;
  displayName: string | null;
  email: string;
  avatar: string | null;
  phone: string | null;
}
