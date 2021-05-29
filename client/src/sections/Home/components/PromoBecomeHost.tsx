import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import { PromoBecomeHostDiv } from "../styles";
import { CustomButtonPrimary } from "../../../styles";
const { Text, Title } = Typography;

export const PromoBecomeHost = () => {
  return (
    <Link to="/guild/host">
      <PromoBecomeHostDiv>
        <Space direction="vertical" className="promo-host-content">
          <Title level={2}>Become a Host</Title>
          <Text>
            Earn extra income and unlock new opportunities by sharing your
            space.
          </Text>
          <CustomButtonPrimary size="large">Learn More!</CustomButtonPrimary>
        </Space>
      </PromoBecomeHostDiv>
    </Link>
  );
};
