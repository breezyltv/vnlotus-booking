import { useQuery } from "react-apollo";

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
import { ErrorBanner } from "../../lib/components";
export const Profile = () => {
  const { data, loading, error } = useQuery<ProfileData>(PROFILE);
  const profile = data ? data.profile[0] : null;
  console.log(profile);

  let aboutMe;

  if (profile === null || loading) {
    aboutMe = <Skeleton avatar active paragraph={{ rows: 20 }} />;
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

  const errorBanner = error ? (
    <ErrorBanner description="Sorry! We weren't able to fetch the data. Please try again later!" />
  ) : null;

  return (
    <Row justify="center" align="top">
      {errorBanner}
      <Col xs={24} sm={24} lg={20}>
        <ResumeMain>{aboutMe}</ResumeMain>
      </Col>
    </Row>
  );
};
