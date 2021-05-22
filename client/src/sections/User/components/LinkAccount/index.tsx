import { Button, Typography, Space } from "antd";
import { GoogleOutlined, AuditOutlined } from "@ant-design/icons";
import { User_user as UserType } from "../../../../lib/api/graphql/queries/";
import { LoginProvider } from "../../../../lib/api/graphql/globalTypes";
const { Title, Text } = Typography;
interface Props {
  user: UserType;
}
export const LinkAccount = ({ user }: Props) => {
  return (
    <Space direction="vertical" size={30}>
      <Title level={3}>Account · {user.email}</Title>
      <Space direction="vertical" size={15}>
        <Title level={5}>Google</Title>
        <Button
          type="default"
          size="large"
          disabled={user.provider === LoginProvider.Google ? true : false}
          icon={<GoogleOutlined />}
        >
          Connect to Google
        </Button>
        <Text>Connected to Google.</Text>
      </Space>
      <Space direction="vertical" size={15}>
        <Title level={5}>Link to local account</Title>
        <Button
          type="primary"
          size="large"
          disabled={user.provider === LoginProvider.Email ? true : false}
          icon={<AuditOutlined />}
        >
          Connect to Local Account
        </Button>
        <Text>Create a local account with email and password.</Text>
      </Space>
    </Space>
  );
};
