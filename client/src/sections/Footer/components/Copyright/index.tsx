import { Typography, Space } from "antd";
import { FooterCopyright } from "../styles";
const { Text } = Typography;

export const Copyright = () => {
  return (
    <FooterCopyright>
      <Space direction="vertical">
        <Text>
          © 2021 Lotus. Copyright by Vu Creation Company Limited - MSDN:
          01083xxxxx. No part of this site may be reproduced without our written
          permission.
        </Text>
        <Text>9500 Gilman Dr, La Jolla, CA 92093</Text>
      </Space>
    </FooterCopyright>
  );
};
