import { Copyright, FooterContent } from "./components";
import { FooterStyled, FooterContainer } from "./styles";
import { Divider } from "antd";
export const Footer = () => {
  return (
    <FooterStyled>
      <FooterContainer>
        <FooterContent />
      </FooterContainer>
      <Divider />
      <FooterContainer>
        <Copyright />
      </FooterContainer>
    </FooterStyled>
  );
};
