import styled from "styled-components";
import { colorSchemes, Container } from "../../../styles";
import { Row } from "antd";

export const FooterContainer = styled(Container)``;

export const FooterStyled = styled.footer`
  margin-top: 2rem;
  border-top: 1px solid ${colorSchemes["color-light"]};
  //background-color: ${colorSchemes["color-red"]};
`;

export const FooterCopyright = styled.div`
  text-align: center;
  font-size: 11pt;
  padding: 3rem 0;
  span.ant-typography {
    color: ${colorSchemes["color-gray"]};
  }
`;

export const FooterContentRow = styled(Row)`
  padding-top: 35px;
  .ant-btn {
    padding: 4px 0;
  }
  .ant-btn-link {
    //font-size: 1rem;
    font-weight: 500;
    color: ${colorSchemes["color-black"]};
  }
  .ant-typography a:hover,
  .ant-btn-link:hover {
    color: ${colorSchemes["drk-yellow"]};
  }
  .ant-typography a {
    color: ${colorSchemes["color-black"]};
  }
`;
