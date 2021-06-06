import { Typography, Button, Rate } from "antd";
import { EnvironmentOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { InfoDiv } from "../styles";

const { Text, Title } = Typography;
export const HeaderInfo = () => {
  return (
    <InfoDiv direction="vertical">
      <Title level={1}>Nha Trang Apartment in Champa</Title>
      <Rate disabled allowHalf defaultValue={4.5} />
      <Text>
        <EnvironmentOutlined /> Nha Trang, Khánh Hòa, Vietnam
        <Button type="link">View on Map</Button>
      </Text>
      <Text>
        <InfoCircleOutlined /> Other · 32 m2
      </Text>
      <Text>
        Private room · 1 Bathroom · 1 bed · 1 room · 2 guests (max 2 guests)
      </Text>
    </InfoDiv>
  );
};
