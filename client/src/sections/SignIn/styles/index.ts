import styled from "styled-components";
import { colorSchemes, Container } from "../../../styles";
import { Card } from "antd";

export const LoginContainer = styled(Container)`
  padding: 0 1rem;
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
