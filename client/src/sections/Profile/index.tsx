import { useQuery, useMutation } from "react-apollo";

import { Profile as ProfileData, PROFILE } from "../../lib/api/graphql/queries";
import {
  ResumeHeader,
  ResumeIntro,
  ResumeSkills,
  ResumeExp,
  ResumeSocial,
  ResumeMain,
} from "./components";
import { Row, Col, Skeleton } from "antd";

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
