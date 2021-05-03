import { SearchNav } from "../styles";
import { Input, Menu, Button, Dropdown } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="adults" href="https://www.antgroup.com">
        0 Adults
      </a>
    </Menu.Item>
  </Menu>
);

export const SearchHeader = () => {
  return (
    <SearchNav>
      <Input.Group compact>
        <Input style={{ width: "50%" }} placeholder="Search" />
        <Dropdown overlay={menu} placement="bottomCenter" trigger={["click"]}>
          <Button>Guests</Button>
        </Dropdown>
        <Button type="primary">
          <SearchOutlined />
        </Button>
      </Input.Group>
    </SearchNav>
  );
};
