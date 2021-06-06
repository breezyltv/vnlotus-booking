import { gql } from "apollo-boost";

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken
  }
`;
