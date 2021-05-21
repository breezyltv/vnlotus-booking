import styled from "styled-components";
import { Container, colorSchemes } from "../../../styles";
import { Menu, Space } from "antd";
export const UserContainer = styled(Container)`
  //margin-top: 20px;
  padding: 0 1rem;
`;

export const LeftSettingStyled = styled(Menu)`
  //background-color: ${colorSchemes["color-light"]};

  margin-bottom: 1.5rem;
  border-radius: 10px;
  //border: 1px solid ${colorSchemes["color-grayish"]};
  box-shadow: ${colorSchemes["shadow-normal"]} !important;
  font-size: 1rem;

  li:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: 0;
  }
  li:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-bottom: 0;
  }
`;

export const InfoBarHeader = styled.div`
  background: ${colorSchemes["banner-color"]};
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 20px;
`;

export const InfoLeftBarStyled = styled(Space)`
  font-size: 14pt;
`;
