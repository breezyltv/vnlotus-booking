export interface Viewer {
  id: string | null;
  csrfToken: string | null;
  avatar: string | null;
  displayName: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}

export enum SettingLeftBarType {
  PROFILE = "1",
  CHANGE_PASSWORD = "2",
  PAYMENT = "3",
  LINK_ACCOUNT = "4",
}

export interface YupError {
  path: string;
  message: string;
}

export enum RoomType {
  APARTMENT = "apartment",
  HOUSE = "house",
  VILLA = "villa",
  RESORT = "resort",
  HOTEL = "hotel",
  HOMESTAY = "homestay",
}

export interface TokenUserData {
  _id: string;
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  email: string;
  provider: string;
}

export interface ITokenUser {
  data: TokenUserData;
  iat: number;
  exp: number;
}
