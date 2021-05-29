import { SearchNav } from "../../styles";
import { CustomButtonPrimary, CustomButtonDefault } from "../../../../styles";
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
          <CustomButtonDefault>Guests</CustomButtonDefault>
        </Dropdown>
        <CustomButtonPrimary>
          <SearchOutlined />
        </CustomButtonPrimary>
      </Input.Group>
    </SearchNav>
  );
};
