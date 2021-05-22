import { Booking, Room } from "../../../lib/types";
import { User, YupError } from "../../../lib/types";
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

export interface UserUpdateArgs {
  user: User;
}

export interface UserUpdateReturnType {
  data: User | null;
  errors: YupError[] | null;
}
