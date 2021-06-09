import { useState } from "react";
import { Button, Typography, Space, Modal } from "antd";
import { GoogleOutlined, AuditOutlined } from "@ant-design/icons";
import { User_user as UserType } from "../../../../lib/api/graphql/queries/";
import { LoginType } from "../../../../lib/api/graphql/globalTypes";
import { UpdateLocalAccountModal } from "./UpdateLocalAccountModal";
const { Title, Text } = Typography;
interface Props {
  user: UserType;
}
export const LinkAccount = ({ user }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const modal = (
    <UpdateLocalAccountModal
      visibleModal={visibleModal}
      setVisibleModal={setVisibleModal}
      user={user}
    />
  );

  return (
    <>
      {modal}
      <Space direction="vertical" size={30}>
        <Title level={3}>Account · {user.email}</Title>
        <Space direction="vertical" size={15}>
          <Title level={5}>Google</Title>
          <Button
            type="default"
            size="large"
            disabled={user.provider === LoginType.GOOGLE ? true : false}
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
            disabled={user.provider === LoginType.EMAIL ? true : false}
            icon={<AuditOutlined />}
            onClick={() => setVisibleModal(true)}
          >
            Connect to Local Account
          </Button>
          <Text>Create a local account with email and password.</Text>
        </Space>
      </Space>
    </>
  );
};
