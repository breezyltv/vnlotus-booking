import styled from "styled-components";
import { colorSchemes } from "../../../../styles";

export const FooterStyled = styled.footer`
  margin-top: 4rem;
  border-top: 1px solid ${colorSchemes["color-light"]};
  //background-color: ${colorSchemes["color-red"]};
`;

export const FooterCopyright = styled.div`
  text-align: center;
  font-size: 11pt;
  padding: 3rem 0;
  span {
    color: ${colorSchemes["color-gray"]};
  }
`;
