import { Typography, Col, Space, Divider, Progress, Tag } from "antd";
import { Profile_profile as Profile } from "../../../../lib/api";
import { DynamicIcon } from "../DynamicIcon";
import {
  ResumeSkill,
  ResumeSkillTitle,
  ResumeSectionHeading,
  ResumeLangInfo,
  ResumeAside,
  ResumeSkillsRow,
} from "../styles";
import { colorSchemes } from "../../../../styles";
const { Title, Text } = Typography;

interface Props {
  profile: Profile;
}

export const ResumeSkills = ({ profile }: Props) => {
  return (
    <>
      <ResumeSkillsRow>
        <Col sm={24} md={12} lg={18}>
          <ResumeSkill>
            <ResumeSectionHeading>
              <Title level={2}>Technical Skills</Title>
            </ResumeSectionHeading>
            <ResumeSkillTitle>
              {profile.skills.frameworks &&
                profile.skills.frameworks.map((item, idx) => (
                  <>
                    <Text>
                      {item.title}
                      <DynamicIcon
                        iconName={item.title}
                        size={20}
                        type="frameworks"
                      />
                    </Text>
                    <Progress
                      key={idx}
                      percent={item.level ? item.level : 0}
                      showInfo={false}
                      trailColor={colorSchemes["second-main-color"]}
                      strokeColor={colorSchemes["main-color"]}
                    />
                  </>
                ))}
            </ResumeSkillTitle>

            <Divider />
            <Typography>
              <Title level={5}>Languages:</Title>
            </Typography>
            <ResumeLangInfo>
              <Space wrap>
                {profile?.skills?.languages?.map((item, idx) => (
                  <Title level={5} key={idx}>
                    <DynamicIcon
                      iconName={item?.title}
                      size={18}
                      type="languages"
                    />
                    {item?.title}
                  </Title>
                ))}
              </Space>
            </ResumeLangInfo>
          </ResumeSkill>
        </Col>

        <Col sm={24} md={10} lg={6}>
          <ResumeSectionHeading>
            <Title level={2}>Additional Skills</Title>
          </ResumeSectionHeading>
          <ResumeAside>
            <Space wrap>
              {profile.skills.tools &&
                profile.skills.tools.map((item, idx) => (
                  <Tag key={idx} color={colorSchemes["main-color"]}>
                    <DynamicIcon iconName={item.title} size={20} type="tools" />
                    {item.title}
                  </Tag>
                ))}
            </Space>
          </ResumeAside>
        </Col>
        <Divider />
      </ResumeSkillsRow>
    </>
  );
};
