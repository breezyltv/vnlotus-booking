import { Booking, Room } from "../../../lib/types";
import { User, YupError } from "../../../lib/types";
export interface IUserArgs {
  id: string;
}

export interface IUserBookingArgs {
  limit: number;
  page: number;
}

export interface IUserBookingsData {
  total: number;
  result: Booking[];
}

export interface IUserRoomsArgs {
  limit: number;
  page: number;
}

export interface IUserRoomsData {
  total: number;
  result: Room[];
}

export interface IUserUpdateArgs {
  user: User;
}
export interface ILinkLocalAccountArgs {
  email: string;
  password: string;
  confirm_password: string;
}

export interface IUserUpdateReturnType {
  data: User | null;
  errors: YupError[] | null;
}

export interface ILinkLocalAccount {
  data: boolean;
  errors: YupError[] | null;
}
