import { useMutation } from "@apollo/react-hooks";
import { AccountBarRight } from "../../styles";
import { Typography, Space, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Viewer } from "../../../../lib/types";
import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../../../lib/utils";
import {
  SIGN_OUT,
  SignOut as SignOutData,
} from "../../../../lib/api/graphql/mutations";
const Text = Typography.Text;
const date = new Date();

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AccountInfoBar = ({ viewer, setViewer }: Props) => {
  const [signOut, { loading: logOutLoading }] = useMutation<SignOutData>(
    SIGN_OUT,
    {
      onCompleted: (data) => {
        if (data && data.signOut) {
          setViewer(data.signOut);
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          displaySuccessNotification("You've successfully signed out!");
        }
      },
      onError: (data) => {
        console.log(data);

        displayErrorMessage(
          "Sorry! weren't able to sign you out. Please try again!"
        );
      },
    }
  );
  const handleSignOut = () => {
    signOut();
  };
  const infoBar = (
    <div>
      <Space size={20} align="end">
        <Space direction="vertical">
          <Text>TODAY</Text>
          <Text strong>{date.toLocaleDateString("en-US")}</Text>
        </Space>
        <Space direction="vertical">
          <Text>MY ACCOUNT</Text>
          <Text strong>{viewer.displayName?.toLocaleUpperCase()}</Text>
        </Space>
        <Button
          size="small"
          onClick={handleSignOut}
          icon={<LogoutOutlined />}
          loading={logOutLoading}
        >
          Log Out
        </Button>
      </Space>
    </div>
  );

  return <AccountBarRight>{infoBar}</AccountBarRight>;
};
