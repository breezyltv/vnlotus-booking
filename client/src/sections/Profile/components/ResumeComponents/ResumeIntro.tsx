import { Typography, Divider, Avatar, Image, Col } from "antd";
import { ResumeIntroStyled, ResumeIntroRow } from "../styles";
import { Profile_profile as Profile } from "../../__generated__/Profile";
import { UserOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;
interface Props {
  profile: Profile;
}

export const ResumeIntro = ({ profile }: Props) => {
  return (
    <>
      <ResumeIntroRow>
        <Col xs={24} sm={24} md={6} lg={4}>
          {profile.avatar ? (
            <Avatar size={120} src={<Image src={profile.avatar} />} />
          ) : (
            <Avatar icon={<UserOutlined />} />
          )}{" "}
        </Col>

        <Col xs={24} sm={24} md={18} lg={20}>
          <ResumeIntroStyled>
            <Typography>
              <Paragraph>{profile.bio}</Paragraph>
            </Typography>
          </ResumeIntroStyled>
        </Col>
        <Divider />
      </ResumeIntroRow>
    </>
  );
};
