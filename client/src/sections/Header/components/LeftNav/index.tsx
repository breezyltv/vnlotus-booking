import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
interface Props {
  mode: boolean;
}
export const LeftNav = ({ mode }: Props) => {
  const leftMenuContent = (
    <>
      <Menu mode={mode ? "inline" : "horizontal"}>
        <Menu.Item key="author">
          <Link to="/about">About Me</Link>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link to="/contact">Contact Me</Link>
        </Menu.Item>
      </Menu>
    </>
  );

  return <>{leftMenuContent}</>;
};
