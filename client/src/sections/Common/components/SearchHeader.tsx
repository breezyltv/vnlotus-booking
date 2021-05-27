import { Col, Select } from "antd";
import {} from "@ant-design/icons";
import { SearchHeaderRow } from "../styles";
import { CustomSearchPrimary } from "../../../styles/";

const { Option } = Select;
export const SearchHeader = () => {
  return (
    <SearchHeaderRow gutter={[20, 20]}>
      <Col xs={24} md={{ span: 10 }} lg={8}>
        <CustomSearchPrimary placeholder="input search text" enterButton />
      </Col>
      <Col xs={24} md={{ span: 6, offset: 8 }} lg={{ span: 4, offset: 12 }}>
        <Select defaultValue="Order By: select" className="order__by">
          <Option value="low">Price: Low to High</Option>
          <Option value="high">Price: High to Low</Option>
        </Select>
      </Col>
    </SearchHeaderRow>
  );
};
