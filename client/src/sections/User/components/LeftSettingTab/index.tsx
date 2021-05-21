import { useContext } from "react";
import { AuthContext } from "../../../../lib/auth/AuthProvider";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { LeftSettingStyled } from "../../styles";

import { SettingLeftBarType } from "../../../../lib/types";
import { HostInfo } from "../../components";
import {
  CalendarOutlined,
  CreditCardOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

interface Props {
  selectedKeys: string;
  isUser: boolean;
}

export const LeftSettingTab = ({ selectedKeys, isUser }: Props) => {
  const { viewer } = useContext(AuthContext);
  return (
    <>
      <LeftSettingStyled mode="vertical-left" selectedKeys={[selectedKeys]}>
        <Menu.Item key={SettingLeftBarType.PROFILE} icon={<CalendarOutlined />}>
          <Link to={`/user/edit-account/profile/${viewer.id}`}>
            Account Info
          </Link>
        </Menu.Item>
        <Menu.Item
          key={SettingLeftBarType.CHANGE_PASSWORD}
          icon={<LockOutlined />}
        >
          <Link to={`/user/edit-account/change-password/${viewer.id}`}>
            Change Password
          </Link>
        </Menu.Item>
        <Menu.Item
          key={SettingLeftBarType.PAYMENT}
          icon={<CreditCardOutlined />}
        >
          <Link to={`/user/edit-account/payment/${viewer.id}`}>Payment</Link>
        </Menu.Item>
        <Menu.Item
          key={SettingLeftBarType.LINK_ACCOUNT}
          icon={<UserOutlined />}
        >
          <Link to={`/user/edit-account/link-account/${viewer.id}`}>
            Link Account
          </Link>
        </Menu.Item>
      </LeftSettingStyled>
      {isUser ? <HostInfo /> : null}
    </>
  );
};
