import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Viewer } from "../../lib/types";
import { LeftNav, RightNav, SearchHeader, AccountInfoBar } from "./components";
import { AccountMenuSub } from "./components/AccountMenuSub";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";

import {
  MenuDiv,
  Nav,
  Logo,
  NavImg,
  NavTitle,
  NavSubMenu,
  AccountSubMenuStyled,
} from "./styles";
import logo from "./assets/lotus.png";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Header = ({ viewer, setViewer }: Props) => {
  const [accountMenu, setAccountMenu] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const accountNav = window.location.pathname.split("/").includes("user");
    setAccountMenu(accountNav);
    return history.listen((location) => {
      //console.log(`You changed the page to: ${location.pathname}`);
      setAccountMenu(location.pathname.trim().split("/").includes("user"));
    });
  }, [history]);

  const [visible, setVisible] = useState(false);
  const menu =
    !accountMenu || !viewer.id ? (
      <>
        <SearchHeader />
        <div className="leftMenu">
          <LeftNav mode={visible} />
        </div>
        <div className="rightMenu">
          <RightNav mode={visible} viewer={viewer} setViewer={setViewer} />
        </div>
        <Button className="barsMenu" onClick={() => setVisible(true)}>
          <MenuOutlined />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <LeftNav mode={visible} />
          <RightNav mode={visible} viewer={viewer} setViewer={setViewer} />
        </Drawer>
      </>
    ) : (
      <AccountInfoBar />
    );
  return (
    <MenuDiv>
      <Nav>
        <Logo>
          <Link to="/">
            <NavImg alt="logo" src={logo}></NavImg>
            <NavTitle>Lotus</NavTitle>
          </Link>
        </Logo>
        <NavSubMenu>{menu}</NavSubMenu>
      </Nav>
      {accountMenu && viewer.id ? (
        <AccountSubMenuStyled>
          <AccountMenuSub mode={"horizontal"} />
        </AccountSubMenuStyled>
      ) : null}
    </MenuDiv>
  );
};
