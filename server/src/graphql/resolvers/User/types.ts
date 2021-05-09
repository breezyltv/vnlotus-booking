import { Booking, Room } from "../../../lib/types";
export interface UserArgs {
  id: string;
}

export interface UserBookingArgs {
  limit: number;
  page: number;
}

export interface UserBookingsData {
  total: number;
  result: Booking[];
}

export interface UserRoomsArgs {
  limit: number;
  page: number;
}

export interface UserRoomsData {
  total: number;
  result: Room[];
}
