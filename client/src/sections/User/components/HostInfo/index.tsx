import { Space, Typography } from "antd";

import { CustomButtonDefaultMainColor } from "../../styles/";

const { Text, Title } = Typography;
export const HostInfo = () => {
  return (
    <Space direction="vertical">
      <Title level={3}>Become A Host</Title>
      <Text>
        Interested in becoming a Lotus host?. Register with your Stripe account!
      </Text>
      <CustomButtonDefaultMainColor size="large">
        Connect with Stripe
      </CustomButtonDefaultMainColor>
      <Text>
        Lotus homestays use <a href="https://stripe.com/">Stripe</a> to help
        transfer your earnings in a secure and truster manner.
      </Text>
    </Space>
  );
};
