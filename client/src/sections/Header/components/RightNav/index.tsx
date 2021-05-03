import { Link } from "react-router-dom";
import {
  LoginOutlined,
  SolutionOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
interface Props {
  mode: boolean;
}
export const RightNav = ({ mode }: Props) => {
  return (
    <Menu mode={mode ? "inline" : "horizontal"}>
      <Menu.Item key="host" icon={<ShopOutlined />}>
        <Link to="/host">Host</Link>
      </Menu.Item>
      <Menu.Item key="signUp" icon={<SolutionOutlined />}>
        <Link to="/signup">Sign Up</Link>
      </Menu.Item>
      <Menu.Item key="signIn" icon={<LoginOutlined />}>
        <Link to="/signin">Sign In</Link>
      </Menu.Item>
    </Menu>
  );
};
