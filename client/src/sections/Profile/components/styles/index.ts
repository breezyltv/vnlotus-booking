import styled from "styled-components";
import { Container, colorSchemes } from "../../../../styles";
import { Typography, Row } from "antd";
const { Title } = Typography;

export const ResumeMain = styled(Container)`
  box-shadow: ${colorSchemes["shadow-large"]};
  background-color: ${colorSchemes["color-light"]};
  margin-top: 3rem;
  margin-bottom: 3rem;
  .ant-skeleton {
    padding: 1rem;
  }
  @media (max-width: 767px) {
    margin: 0.5rem;
  }
`;

export const ResumeHeaderRow = styled(Row)`
  background-color: ${colorSchemes["main-color"]};
  color: ${colorSchemes["second-main-color"]};
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${colorSchemes["second-main-color"]};
  @media (max-width: 767px) {
    padding: 2rem;
  }
`;

export const ResumeIntroRow = styled(Row)`
  padding: 0 4rem;
  @media (max-width: 767px) {
    padding: 0 2rem;
  }
`;

export const ResumeSkillsRow = styled(ResumeIntroRow)``;
export const ResumeExpRow = styled(ResumeIntroRow)``;

export const ResumeTitleName = styled(Title)`
  font-size: 2.75rem;
  font-weight: 900;
  letter-spacing: 0.4rem;
`;

export const ResumeTagLine = styled.div`
  font-size: 1rem;
  font-weight: 300;
`;
export const ResumeContact = styled.div`
  font-size: 0.9;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  padding-left: 25px;
  svg {
    margin-right: 15px;
  }
  a {
    font-weight: 500;
    color: ${colorSchemes["second-main-color"]};
  }
  a:hover {
    color: ${colorSchemes["color-night"]};
  }
  @media (max-width: 767px) {
    border: 0;
    padding-left: 0px;
    margin-top: 20px;
  }
`;

export const ResumeIntroStyled = styled.div`
  .ant-typography {
    font-size: 1.1rem;
    text-align: justify;
  }
  @media (max-width: 767px) {
    .ant-typography {
      margin-top: 1rem;
    }
  }
`;

export const ResumeSkill = styled.div`
  margin-right: 40px;
`;
export const ResumeSkillTitle = styled.div`
  display: inline !important;
  .ant-typography {
    font-weight: bold;
    font-size: 1rem;
    float: left;
  }
  .ant-typography svg {
    margin-left: 10px;
  }
  .ant-progress {
    margin-bottom: 10px;
  }
  .ant-progress-inner {
    height: 12px;
  }
  .ant-progress-bg {
    height: 12px !important;
  }
`;

export const ResumeSectionHeading = styled.div`
  border-left: 4px solid;
  h2 {
    position: relative;
    padding-left: 1rem;
    font-size: 1.2rem;
    letter-spacing: 0.15rem;
    margin-bottom: 1rem;
  }
`;

export const ResumeLangInfo = styled.div`
  margin-bottom: 10px;
  .ant-typography svg {
    margin-right: 6px;
  }
  .ant-typography {
    border: 2px solid ${colorSchemes["main-color"]};
    padding: 5px 10px;
    border-radius: 5px;
    color: ${colorSchemes["second-main-color"]};
  }
`;

export const ResumeAside = styled.aside`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  padding-left: 25px;
  span {
    font-size: 1em;
    padding: 7px 10px;
    color: ${colorSchemes["second-main-color"]};
  }
  svg {
    margin-right: 5px;
  }
  @media (max-width: 767px) {
    border: none;
    padding: 0;
  }
`;

export const ResumeTimeline = styled.div`
  margin-top: 30px;
  .ant-typography {
    font-size: 12pt;
  }
  a {
    color: ${colorSchemes["main-color"]};
  }
  a:hover {
    color: ${colorSchemes["second-main-color"]};
  }
`;

export const ResumeSocialList = styled.div`
  //background-color: ${colorSchemes["second-main-color"]};
  text-align: center;
  padding: 0 4rem 3rem 4rem;
  margin-top: 1rem;
  .ant-btn-link {
    font-size: 1rem;
    font-weight: 500;
    color: ${colorSchemes["color-black"]};
  }
  .ant-btn-link:hover {
    color: ${colorSchemes["second-main-color"]};
  }
  @media (max-width: 767px) {
    .ant-btn-link {
      font-size: 0.8rem;
    }
  }
`;
