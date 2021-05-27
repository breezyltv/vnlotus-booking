export interface Viewer {
  id: string | null;
  token: string | null;
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
