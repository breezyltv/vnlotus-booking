import styled from "styled-components";
import { colorSchemes, Container } from "../../../styles";
import { Card, Spin } from "antd";

export const LoginContainer = styled(Container)`
  padding: 0 1rem;
`;
export const ContentSpinner = styled(Container)`
  height: 70vh;
`;

export const SpinnerStyled = styled(Spin)`
  position: fixed;
  top: 45%;
  left: 50%;
  /* The translate value for transform is based off the size of the element, so that will center nicely */
  transform: translate(-50%, -50%);
  color: ${colorSchemes["main-text-color"]};
`;

export const LoginHeader = styled.div`
  margin-bottom: 1.5rem;
  span {
    font-size: 14pt;
  }
`;

export const LoginCard = styled(Card)`
  padding: 2rem 1rem;
  border-radius: 10px;
  box-shadow: ${colorSchemes["shadow-medium"]};
  margin-top: -6.875rem;
  @media (max-width: 991px) {
    margin-top: -2.875rem;
  }
`;

export const LoginMeta = styled.div`
  text-align: center;
  margin: 30px 0;
  a {
    font-weight: bold;
  }
`;
