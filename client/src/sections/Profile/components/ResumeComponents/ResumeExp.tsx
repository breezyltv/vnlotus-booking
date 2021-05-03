import { Typography, Divider, Col, Space, Timeline } from "antd";
import { upperFirstChar, upperCaseString } from "../../../../lib/utils/util";
import { Profile_profile as Profile } from "../../__generated__/Profile";
import { ResumeSectionHeading, ResumeTimeline, ResumeExpRow } from "../styles";
import { colorSchemes } from "../../../../styles";
import moment from "moment";
const { Title, Paragraph, Text } = Typography;
interface Props {
  profile: Profile;
}
export const ResumeExp = ({ profile }: Props) => {
  return (
    <>
      <ResumeExpRow gutter={[15, 0]}>
        <Col sm={24} md={12} lg={18}>
          <ResumeSectionHeading>
            <Title level={2}>Projects-Experience</Title>
          </ResumeSectionHeading>
          <ResumeTimeline>
            <Timeline>
              {profile.projects.map((item) => (
                <Timeline.Item color={colorSchemes["main-color"]}>
                  <Typography>
                    <Space direction="vertical">
                      <Title level={5}>{upperCaseString(item.title)}</Title>
                      <Text>{item.feature}</Text>
                      <Paragraph>{item.description}</Paragraph>
                      <a href={item.github_link}>{item.github_link}</a>
                    </Space>
                  </Typography>
                </Timeline.Item>
              ))}
            </Timeline>
          </ResumeTimeline>
        </Col>
        <Col sm={24} md={12} lg={6}>
          <ResumeSectionHeading>
            <Title level={2}>Education</Title>
          </ResumeSectionHeading>
          <ResumeTimeline>
            <Timeline>
              {profile.education
                .sort(
                  (a, b) =>
                    new Date(a.from).getTime() - new Date(b.from).getTime()
                )
                .map((item) => (
                  <Timeline.Item color={colorSchemes["main-color"]}>
                    <Typography>
                      <Space direction="vertical">
                        <Text>
                          {moment(item.from).year()} -{" "}
                          {item.to ? moment(item.to).year() : "Now"}
                        </Text>
                        <Title level={5}>{upperCaseString(item.school)}</Title>
                        <Text>Major: {upperCaseString(item.major)}</Text>
                        <Paragraph>
                          {item.description && upperFirstChar(item.description)}
                        </Paragraph>
                      </Space>
                    </Typography>
                  </Timeline.Item>
                ))}
            </Timeline>
          </ResumeTimeline>
        </Col>
        <Divider />
      </ResumeExpRow>
    </>
  );
};
