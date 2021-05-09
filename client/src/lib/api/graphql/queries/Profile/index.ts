import { gql } from "apollo-boost";
export const PROFILE = gql`
  query Profile {
    profile {
      id
      handle
      avatar
      phone
      email
      bio
      status
      location
      github
      position
      social
      skills {
        languages {
          title
        }
        frameworks {
          title
          level
        }
        tools {
          title
        }
      }
      projects {
        title
        github_link
        description
        from
        feature
      }
      education {
        school
        major
        from
        to
        description
      }
    }
  }
`;
