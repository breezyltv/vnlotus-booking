import { Link } from "react-router-dom";
import { Typography, Form, Space, Divider, Switch } from "antd";
import {
  CustomInput,
  CustomInputPassword,
  CustomButton,
  CustomButtonGoogle,
} from "../../../styles";
import { LoginCard, LoginHeader, LoginMeta } from "../styles";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ReactComponent as GoogleSVG } from "../../Common/assets/google-svg.svg";
import { IValidateMess } from "../../../lib/types";
import { validateStatus } from "../../../lib/utils";
const { Title, Text } = Typography;
interface Props {
  handleAuthorizeViaGoogle: () => void;
  handleSignInViaEmail: (data: any) => void;
  signInViaEmailLoading: boolean;
  showBackendError: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  backendErrors: IValidateMess;
  setBackendErrors: React.Dispatch<React.SetStateAction<IValidateMess>>;
}

const generateErrors = (errors: string[]): JSX.Element | null => {
  //console.log(errors);
  if (!errors || errors === undefined) return null;
  return (
    <>
      {errors &&
        errors.map((error, idx) => (
          <>
            <span key={idx}>{error}</span>
            <br />
          </>
        ))}
    </>
  );
};

export const LoginForm = ({
  handleAuthorizeViaGoogle,
  handleSignInViaEmail,
  signInViaEmailLoading,
  showBackendError,
  backendErrors,
  setBackendErrors,
}: Props) => {
  const [isShowBackendError, setIsShowBackendError] = showBackendError;
  const handleFieldsChange = (data: any) => {
    //get key where the field changed
    const key = Object.keys(data)[0];
    //remove validation message
    if (backendErrors[key]) {
      delete backendErrors[key];
      //console.log(backendErrors);
      //set messages again
      setBackendErrors({
        ...backendErrors,
      });
    }
  };
  return (
    <LoginCard>
      <LoginHeader>
        <Title level={2}>Sign In</Title>
        <Text>...for more experiences</Text>
      </LoginHeader>
      <Form onFinish={handleSignInViaEmail} onValuesChange={handleFieldsChange}>
        <Form.Item
          name="email"
          rules={
            isShowBackendError
              ? []
              : [
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "Email is invalid!",
                  },
                ]
          }
          required
          hasFeedback
          {...validateStatus(
            generateErrors(backendErrors["email"]),
            isShowBackendError
          )}
        >
          <CustomInput placeholder="Email address" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={
            isShowBackendError
              ? []
              : [{ required: true, message: "Please input your password!" }]
          }
          required
          hasFeedback
          {...validateStatus(
            generateErrors(backendErrors["password"]),
            isShowBackendError
          )}
        >
          <CustomInputPassword
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <CustomButton
            htmlType="submit"
            size="large"
            shape="round"
            block
            loading={signInViaEmailLoading}
          >
            Sign In
          </CustomButton>
        </Form.Item>
      </Form>
      <LoginMeta>
        <Space direction="vertical" size={20}>
          <Space align="start">
            <Text>
              Turn off Antd's validation to test validation from backend.
            </Text>
            <Switch
              onChange={(checked) => {
                setIsShowBackendError(true);
                if (!checked) {
                  setIsShowBackendError(false);
                  setBackendErrors({});
                }
              }}
            />
          </Space>
          <Text>
            Reset your password? <Link to="/reset"> Click here</Link>
          </Text>
          <Text>
            Don't have an account? <Link to="/signup"> Sign Up</Link>
          </Text>
        </Space>
      </LoginMeta>
      <Divider>Or</Divider>
      <CustomButtonGoogle
        icon={
          <span role="img" className="anticon">
            <GoogleSVG />
          </span>
        }
        size="large"
        block
        onClick={handleAuthorizeViaGoogle}
      >
        Sign In with Google
      </CustomButtonGoogle>
    </LoginCard>
  );
};
