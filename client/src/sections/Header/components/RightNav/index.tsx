import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Viewer } from "../../../../lib/types";
import { upperCaseString } from "../../../../lib/utils";
import {
  LoginOutlined,
  LogoutOutlined,
  SolutionOutlined,
  ShopOutlined,
  CaretDownOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Dropdown } from "antd";
import { MenuUserLink } from "../../styles";
import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../../../lib/utils";
import {
  SIGN_OUT,
  SignOut as SignOutData,
} from "../../../../lib/api/graphql/mutations";

interface Props {
  mode: boolean;
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}
export const RightNav = ({ mode, viewer, setViewer }: Props) => {
  const [signOut] = useMutation<SignOutData>(SIGN_OUT, {
    onCompleted: (data) => {
      if (data && data.signOut) {
        setViewer(data.signOut);
        sessionStorage.removeItem("token");
        displaySuccessNotification("You've successfully signed out!");
      }
    },
    onError: (data) => {
      console.log(data);

      displayErrorMessage(
        "Sorry! weren't able to sign you out. Please try again!"
      );
    },
  });
  const handleSignOut = () => {
    signOut();
  };

  const settingMenu = (
    <Menu>
      <Menu.Item key="0" icon={<CalendarOutlined />}>
        My Bookings
      </Menu.Item>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        <Link to={`/user/${viewer.id}`}>Account Setting</Link>
      </Menu.Item>
    </Menu>
  );

  const subRightMenu =
    viewer.id && viewer.avatar ? (
      <>
        <Menu.Item key="signUp">
          <Dropdown
            overlay={settingMenu}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <MenuUserLink onClick={(e) => e.preventDefault()}>
              <Avatar size="small" src={viewer.avatar} />
              <span>
                {viewer.displayName && upperCaseString(viewer.displayName)}
              </span>
              <CaretDownOutlined />
            </MenuUserLink>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="signOut" icon={<LogoutOutlined />}>
          <a onClick={handleSignOut}>Sign Out</a>
        </Menu.Item>
      </>
    ) : (
      <>
        <Menu.Item key="signUp" icon={<SolutionOutlined />}>
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
        <Menu.Item key="signIn" icon={<LoginOutlined />}>
          <Link to="/signin">Sign In</Link>
        </Menu.Item>
      </>
    );

  return (
    <Menu mode={mode ? "inline" : "horizontal"}>
      <Menu.Item key="host" icon={<ShopOutlined />}>
        <Link to="/host">Host</Link>
      </Menu.Item>
      {subRightMenu}
    </Menu>
  );
};
