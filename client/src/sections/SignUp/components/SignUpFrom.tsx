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
import { backendErrorMessages } from "../../../lib/components";
const { Title, Text } = Typography;

interface Props {
  handleSignUpViaGoogle: () => void;
  handleSignUpViaEmail: (data: any) => void;
  signInLoading: boolean;
  registerLoading: boolean;
  showBackendError: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  backendErrors: IValidateMess;
  setBackendErrors: React.Dispatch<React.SetStateAction<IValidateMess>>;
}

export const SignUpForm = ({
  handleSignUpViaGoogle,
  handleSignUpViaEmail,
  signInLoading,
  showBackendError,
  registerLoading,
  backendErrors,
  setBackendErrors,
}: Props) => {
  const [isShowBackendError, setIsShowBackendError] = showBackendError;

  const handleFieldsChange = (data: any) => {
    //get key where the field changed
    const key = Object.keys(data.user)[0];
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
        <Title level={2}>Sign Up</Title>
        <Text>...for more experiences and benefits</Text>
      </LoginHeader>
      <Form onFinish={handleSignUpViaEmail} onValuesChange={handleFieldsChange}>
        <Form.Item
          name={["user", "email"]}
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
            backendErrorMessages(backendErrors["email"]),
            isShowBackendError
          )}
        >
          <CustomInput placeholder="Email address" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name={["user", "first_name"]}
          rules={
            isShowBackendError
              ? []
              : [
                  {
                    required: true,
                    message: "Please input your first name!",
                    whitespace: true,
                  },
                  {
                    min: 2,
                    message: "First Name must be at least 2 characters",
                  },
                  {
                    max: 30,
                    message: "First Name cannot be longer than 30 characters",
                  },
                ]
          }
          required
          hasFeedback
          {...validateStatus(
            backendErrorMessages(backendErrors["first_name"]),
            isShowBackendError
          )}
        >
          <CustomInput placeholder="First name" />
        </Form.Item>

        <Form.Item
          name={["user", "last_name"]}
          rules={
            isShowBackendError
              ? []
              : [
                  {
                    required: true,
                    message: "Please input your last name!",
                    whitespace: true,
                  },
                  {
                    min: 2,
                    message: "Last Name must be at least 2 characters",
                  },
                  {
                    max: 30,
                    message: "Last Name cannot be longer than 30 characters",
                  },
                ]
          }
          required
          hasFeedback
          {...validateStatus(
            backendErrorMessages(backendErrors["last_name"]),
            isShowBackendError
          )}
        >
          <CustomInput placeholder="Last name" />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          rules={
            isShowBackendError
              ? []
              : [{ required: true, message: "Please input your password!" }]
          }
          required
          hasFeedback
          {...validateStatus(
            backendErrorMessages(backendErrors["password"]),
            isShowBackendError
          )}
        >
          <CustomInputPassword
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item
          name={["user", "confirm_password"]}
          rules={
            isShowBackendError
              ? []
              : [
                  { required: true, message: "Please input your password!" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]
          }
          required
          hasFeedback
          {...validateStatus(
            backendErrorMessages(backendErrors["confirm_password"]),
            isShowBackendError
          )}
        >
          <CustomInputPassword
            placeholder="Confirm Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <CustomButton
            htmlType="submit"
            size="large"
            shape="round"
            block
            loading={registerLoading}
          >
            Sign Up
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
            You have already a Lotus account? <Link to="/signin"> Sign In</Link>
          </Text>
          <Text>
            By clicking next below and creating an account, you agree to our
            Privacy policy and term of condition of Lotus Homestays.
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
        loading={signInLoading}
        onClick={handleSignUpViaGoogle}
      >
        Sign In with Google
      </CustomButtonGoogle>
    </LoginCard>
  );
};
