import { Collection, ObjectId } from "mongodb";

export enum RoomType {
  Apartment = "APARTMENT",
  House = "HOUSE",
  Villa = "VILLA",
  Resort = "RESORT",
  Hotel = "HOTEL",
  Homestay = "HOMESTAY",
}

export enum LoginProvider {
  Email = "EMAIL",
  Google = "GOOGLE",
}

export interface BookingsIndexMonth {
  [key: string]: boolean;
}

export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth;
}
export interface BookingsIndex {
  [key: string]: BookingsIndexYear;
}

export interface Room {
  _id: ObjectId;
  admin: string;
  host: string;
  title: string;
  description: string;
  type: RoomType;
  image: Pictures;
  address: string;
  country: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndex;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface Pictures {
  main: string;
  collection?: string[];
}

export interface Booking {
  _id: ObjectId;
  room: ObjectId;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface User {
  _id: string;
  token: string;
  provider: LoginProvider;
  displayName?: string;
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  avatar: string;
  email: string;
  phone?: string;
  address?: string;
  birthday?: Date | null;
  gender?: Gender;
  bio?: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  rooms: ObjectId[];
  authorized?: boolean;
}

export interface Profile {
  _id: ObjectId;
  date: Date;
  handle: string;
  phone: string;
  email: string;
  bio: string;
  status: string;
  location: string;
  github: string;
  position: string;
  skills: Skills;
  social: SocialObject;
  projects: ProjectType[];
  education: EducationType[];
}

type SocialObject = {
  [key: string]: string;
};

export interface EducationType {
  _id: ObjectId;
  school: string;
  major: string;
  from: Date;
  to: Date;
  description: string;
}

export interface ProjectType {
  _id: ObjectId;
  title: string;
  github_link: string;
  description: string;
  from: Date;
  feature: string;
}

export interface Skills {
  frameworks: SkillsType[];
  languages: SkillsType[];
  tools: SkillsType[];
}

export interface SkillsType {
  _id: ObjectId;
  title: string;
  level: number;
  status: boolean;
}

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}

export interface YupError {
  path: string;
  message: string;
}

export interface Database {
  bookings: Collection<Booking>;
  rooms: Collection<Room>;
  users: Collection<User>;
  profile: Collection<Profile>;
}
