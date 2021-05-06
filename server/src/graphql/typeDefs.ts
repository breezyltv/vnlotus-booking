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
    projects: [ProjectType]
    education: [EducationType]
  }

  type EducationType {
    id: ID!
    school: String!
    major: String!
    from: Date
    to: Date
    description: String
  }

  type ProjectType {
    id: ID!
    title: String!
    github_link: String!
    description: String!
    from: Date
    feature: String!
  }

  type Skills {
    frameworks: [SkillsType!]!
    languages: [SkillsType!]!
    tools: [SkillsType!]!
  }

  type SkillsType {
    id: ID!
    title: String!
    level: Int
    status: Boolean
  }
  type Viewer {
    id: ID
    token: String
    displayName: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }
  input SignInInput {
    code: String!
  }

  type Query {
    authUrl: String!
    listings: [Listing!]!
    profile: [Profile!]!
  }
  type Mutation {
    signIn(input: SignInInput): Viewer!
    signOut: Viewer!
    deleteListing(id: ID!): Listing!
  }
`;
