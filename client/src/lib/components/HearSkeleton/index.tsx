import {
  MenuDiv,
  Nav,
  Logo,
  NavImg,
  NavTitle,
} from "../../../sections/Header/styles";
import logo from "./assets/lotus.png";

export const HeaderSkeleton = () => {
  return (
    <MenuDiv>
      <Nav>
        <Logo>
          <a href="/">
            <NavImg alt="logo" src={logo}></NavImg>
            <NavTitle>Lotus</NavTitle>
          </a>
        </Logo>
      </Nav>
    </MenuDiv>
  );
};
