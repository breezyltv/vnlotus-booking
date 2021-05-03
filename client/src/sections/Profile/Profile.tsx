import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Profile as ProfileData } from "./__generated__/Profile";
import {
  ResumeHeader,
  ResumeIntro,
  ResumeSkills,
  ResumeExp,
  ResumeSocial,
} from "./components";
import { Row, Col, Skeleton } from "antd";
import { ResumeMain } from "./components";

const PROFILE = gql`
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

export const Profile = () => {
  const { data, refetch, loading, error } = useQuery<ProfileData>(PROFILE);
  const profile = data ? data.profile[0] : null;
  console.log(profile);

  let aboutMe;

  if (profile === null || loading) {
    aboutMe = <Skeleton avatar active paragraph={{ rows: 5 }} />;
  } else {
    aboutMe = (
      <>
        <ResumeHeader profile={profile} />

        <ResumeIntro profile={profile} />

        <ResumeSkills profile={profile} />

        <ResumeExp profile={profile} />

        <ResumeSocial />
      </>
    );
  }

  return (
    <Row justify="center" align="top">
      <Col xs={24} sm={24} lg={20}>
        <ResumeMain>{aboutMe}</ResumeMain>
      </Col>
    </Row>
  );
};
