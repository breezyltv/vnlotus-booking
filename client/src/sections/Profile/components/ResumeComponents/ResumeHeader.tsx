import { Typography, Col, Space } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import {
  ResumeHeaderRow,
  ResumeTitleName,
  ResumeTagLine,
  ResumeContact,
} from "../styles";
import { upperFirstChar, upperCaseString } from "../../../../lib/utils";
import { Profile_profile as Profile } from "../../../../lib/api";
const { Text } = Typography;

interface Props {
  profile: Profile;
}

export const ResumeHeader = ({ profile }: Props) => {
  return (
    <>
      <ResumeHeaderRow>
        <Col sm={24} md={12} lg={18}>
          <Space direction="vertical">
            <ResumeTitleName level={2}>Vu Le</ResumeTitleName>

            <ResumeTagLine>
              <Text>{profile && upperFirstChar(profile.status)}</Text>
            </ResumeTagLine>
            <ResumeTagLine>
              <Text>
                {profile.position && upperCaseString(profile.position)}
              </Text>
            </ResumeTagLine>
          </Space>
        </Col>

        <Col sm={24} md={12} lg={6}>
          <ResumeContact>
            <Space direction="vertical">
              {profile.phone && (
                <Text>
                  <PhoneOutlined /> {profile.phone}
                </Text>
              )}
              <Text>
                <MailOutlined />
                {profile.email}
              </Text>
              <Text>
                <GithubOutlined />
                <a href={profile.github ? profile.github : undefined}>
                  {profile.github}
                </a>
              </Text>
              <Text>
                <EnvironmentOutlined />
                {profile.location && upperCaseString(profile.location)}
              </Text>
            </Space>
          </ResumeContact>
        </Col>
      </ResumeHeaderRow>
    </>
  );
};
