import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Float!
  }
  scalar Date

  scalar Object

  type Booking {
    _id: ID!
    room: Room!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  enum RoomsFilter {
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
  }

  enum RoomType {
    APARTMENT
    HOUSE
    VILLA
    RESORT
    HOTEL
    HOMESTAY
  }

  enum LoginType {
    GOOGLE
    EMAIL
  }

  type Pictures {
    main: String!
    collection: [String!]
  }

  type Room {
    _id: ID!
    title: String!
    description: String!
    image: Pictures
    host: User!
    type: RoomType!
    address: String!
    city: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Float!
    numOfBaths: Int!
    numOfBeds: Int!
    numOfGuests: Int!
    rating: Float!
  }

  type Rooms {
    total: Int!
    result: [Room!]!
  }
  enum Gender {
    male
    female
    other
  }

  type User {
    id: ID!
    provider: LoginType!
    displayName: String!
    first_name: String!
    last_name: String!
    avatar: String!
    email: String!
    phone: String
    address: String
    birthday: Date
    gender: Gender
    bio: String
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    rooms(limit: Int!, page: Int!): Rooms!
  }

  type Profile {
    id: ID!
    date: Date
    handle: String!
    avatar: String
    phone: String!
    email: String!
    bio: String!
    status: String!
    location: String
    github: String
    position: String
    skills: Skills!
    social: Object
    projects: [ProjectType!]
    education: [EducationType!]
  }

  type EducationType {
    _id: ID!
    school: String!
    major: String!
    from: Date
    to: Date
    description: String
  }

  type ProjectType {
    _id: ID!
    title: String!
    github_link: String!
    description: String!
    from: Date
    feature: String!
  }

  type Skills {
    frameworks: [SkillsType!]
    languages: [SkillsType!]
    tools: [SkillsType!]
  }

  type SkillsType {
    _id: ID!
    title: String!
    level: Int
    status: Boolean
  }
  type Viewer {
    id: ID
    csrfToken: String
    displayName: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }
  input SignInInput {
    code: String!
  }

  input UserUpdateInput {
    _id: ID!
    first_name: String!
    last_name: String!
    phone: String
    address: String
    birthday: Date
    gender: Gender
    bio: String
  }

  type YupError {
    path: String!
    message: String!
  }

  type UserUpdateGQLReturnType {
    data: User
    errors: [YupError!]
  }

  input RegisterUserInput {
    email: String!
    first_name: String!
    last_name: String!
    password: String!
    confirm_password: String!
    login_type: LoginType!
  }

  type RegisterGQLType {
    data: Viewer
    errors: [YupError!]
  }

  type Query {
    authUrl: String!
    listings: [Listing!]!
    profile: [Profile!]!
    user(id: ID!): User!
    room(id: ID!): Room!
    roomsByLocation(
      location: String
      filter: RoomsFilter!
      limit: Int!
      page: Int!
    ): [Room!]!
  }

  type Mutation {
    register(user: RegisterUserInput): RegisterGQLType!
    signIn(input: SignInInput): Viewer!
    signOut: Viewer!
    deleteListing(id: ID!): Listing!
    updateUser(user: UserUpdateInput!): UserUpdateGQLReturnType
    refreshToken: String!
  }
`;
