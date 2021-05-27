import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../lib/auth/AuthProvider";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  CalendarOutlined,
  SettingOutlined,
  HeartOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";

type MenuMode =
  | "horizontal"
  | "vertical"
  | "vertical-left"
  | "vertical-right"
  | "inline";
interface Props {
  mode: MenuMode;
}

//type KeysSubMenu = "bookings" | "messages" | "edit-account" | "wishlist" | null;
// list of keys to set selectedKeys for sub menu
const AccountSubMenuKeys = ["bookings", "listings", "edit-account", "wishlist"];

export const AccountMenuSub = ({ mode }: Props) => {
  const [subMenuKey, setSubMenuKey] = useState("");
  const { viewer } = useContext(AuthContext);
  //console.log(viewer);
  const history = useHistory();
  useEffect(() => {
    const keyPath = window.location.pathname.trim().split("/")[2];
    if (keyPath && AccountSubMenuKeys.includes(keyPath)) {
      setSubMenuKey(keyPath);
    }
    //setSubMenuKey(keyPath);
    console.log(keyPath);
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      //setSubMenuKey(location.pathname.trim().split("/").includes("user"));
      const keyPath = location.pathname.trim().split("/")[2];
      if (keyPath && AccountSubMenuKeys.includes(keyPath)) {
        setSubMenuKey(keyPath);
      }
    });
  }, [history]);

  return (
    <Menu
      mode={mode}
      selectedKeys={mode === "horizontal" ? [subMenuKey] : [""]}
    >
      <Menu.Item key="bookings" icon={<CalendarOutlined />}>
        <Link to={`/user/bookings/${viewer.id}`}>My Bookings</Link>
      </Menu.Item>
      <Menu.Item key="listings" icon={<CarryOutOutlined />}>
        <Link to={`/user/listings/${viewer.id}`}>My Listings</Link>
      </Menu.Item>
      <Menu.Item key="edit-account" icon={<SettingOutlined />}>
        <Link to={`/user/edit-account/profile/${viewer.id}`}>
          Account Setting
        </Link>
      </Menu.Item>
      <Menu.Item key="wishlist" icon={<HeartOutlined />}>
        <Link to={`/user/wishlist/${viewer.id}`}>Wishlist</Link>
      </Menu.Item>
    </Menu>
  );
};
