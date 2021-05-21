import { AccountBarRight } from "../../styles";
import { Typography, Space, Menu } from "antd";
const Text = Typography.Text;
const date = new Date();
export const AccountInfoBar = () => {
  const infoBar = (
    <div>
      <Space size={20}>
        <Space direction="vertical">
          <Text>TODAY</Text>
          <Text strong>{date.toLocaleDateString("en-US")}</Text>
        </Space>
        <Space direction="vertical">
          <Text>MY ACCOUNT</Text>
          <Text strong>Vu Le</Text>
        </Space>
      </Space>
    </div>
  );

  return <AccountBarRight>{infoBar}</AccountBarRight>;
};
