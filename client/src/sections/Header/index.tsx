import { useState } from "react";
import { Link } from "react-router-dom";
import { LeftNav, RightNav, SearchHeader } from "./components";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";

import { MenuDiv, Nav, Logo, NavImg, NavTitle, NavSubMenu } from "./styles";
import logo from "./assets/lotus.png";

export const Header = () => {
  const [visible, setVisible] = useState(false);
  return (
    <MenuDiv>
      <Nav>
        <Logo>
          <Link to="/">
            <NavImg alt="logo" src={logo}></NavImg>
            <NavTitle>Lotus</NavTitle>
          </Link>
        </Logo>
        <NavSubMenu>
          <SearchHeader />
          <div className="leftMenu">
            <LeftNav mode={visible} />
          </div>
          <div className="rightMenu">
            <RightNav mode={visible} />
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
            <RightNav mode={visible} />
          </Drawer>
        </NavSubMenu>
      </Nav>
    </MenuDiv>
  );
};
