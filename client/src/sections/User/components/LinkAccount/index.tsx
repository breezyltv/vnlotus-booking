import { useState } from "react";
import { Button, Typography, Space } from "antd";
import { AuditOutlined } from "@ant-design/icons";
import { User_user as UserType } from "../../../../lib/api/graphql/queries/";
import { LoginType } from "../../../../lib/api/graphql/globalTypes";
import { UpdateLocalAccountModal } from "./UpdateLocalAccountModal";
import { ReactComponent as GoogleSVG } from "../../../Common/assets/google-svg.svg";
const { Title, Text } = Typography;
interface Props {
  user: UserType;
}
export const LinkAccount = ({ user }: Props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [disableLinkButton, setDisableLinkButton] = useState(false);

  const modal = (
    <UpdateLocalAccountModal
      visibleModal={visibleModal}
      setVisibleModal={setVisibleModal}
      setDisableLinkButton={setDisableLinkButton}
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
            disabled={
              user.linkAccount.google === LoginType.GOOGLE || disableLinkButton
                ? true
                : false
            }
            icon={
              <span role="img" className="anticon">
                <GoogleSVG />
              </span>
            }
            danger
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
            disabled={
              user.linkAccount.email === LoginType.EMAIL || disableLinkButton
                ? true
                : false
            }
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
