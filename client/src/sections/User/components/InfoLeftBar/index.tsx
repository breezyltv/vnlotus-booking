import { useContext } from "react";
import { AuthContext } from "../../../../lib/auth/AuthProvider";
import { Avatar, Space, Typography } from "antd";
import { InfoLeftBarStyled } from "../../styles";
import { upperCaseString } from "../../../../lib/utils/";
import { UserOutlined } from "@ant-design/icons";
const { Text } = Typography;
interface Props {
  selectedKeys: string;
}
const infoBar: InfoBarType = {
  "1": ["Account Info", "Update your avatar and more about you"],
  "2": [
    "Change Password",
    "Change password at least once per six months to keep your account secured",
  ],
  "3": ["Payment", "Connect to Stripe for more convenient payment"],
  "4": [
    "Link Account",
    "Connect your account to sign in much more conveniently",
  ],
};

type InfoBarType = {
  [keys: string]: string[];
};

export const InfoLeftBar = ({ selectedKeys }: Props) => {
  const { viewer } = useContext(AuthContext);
  return (
    <InfoLeftBarStyled>
      {viewer.avatar ? (
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 60, xxl: 70 }}
          src={viewer.avatar}
        />
      ) : (
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 60, xxl: 70 }}
          icon={<UserOutlined />}
        />
      )}

      <Space direction="vertical">
        <Text strong>
          {upperCaseString(viewer.displayName)} · {infoBar[selectedKeys][0]}
        </Text>
        <Text>{infoBar[selectedKeys][1]}</Text>
      </Space>
    </InfoLeftBarStyled>
  );
};
