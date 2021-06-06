import { Link } from "react-router-dom";
import { Typography, Form, Space, Divider } from "antd";
import {
  CustomInput,
  CustomInputPassword,
  CustomButton,
  CustomButtonGoogle,
} from "../../../../styles";
import { LoginCard, LoginHeader, LoginMeta } from "../../styles";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ReactComponent as GoogleSVG } from "../../../Common/assets/google-svg.svg";
const { Title, Text } = Typography;
interface Props {
  handleSignUpViaGoogle: () => void;
  handleSignUpViaEmail: (data: any) => void;
}
export const SignUpForm = ({
  handleSignUpViaGoogle,
  handleSignUpViaEmail,
}: Props) => {
  return (
    <LoginCard>
      <LoginHeader>
        <Title level={2}>Sign Up</Title>
        <Text>...for more experiences and benefits</Text>
      </LoginHeader>
      <Form onFinish={handleSignUpViaEmail}>
        <Form.Item
          name={["user", "email"]}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <CustomInput placeholder="Email address" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name={["user", "first_name"]}
          rules={[
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
          ]}
        >
          <CustomInput placeholder="First name" />
        </Form.Item>

        <Form.Item
          name={["user", "last_name"]}
          rules={[
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
          ]}
        >
          <CustomInput placeholder="Last name" />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <CustomInputPassword
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item
          name={["user", "confirm_password"]}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <CustomInputPassword
            placeholder="Confirm Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <CustomButton htmlType="submit" size="large" shape="round" block>
            Sign Up
          </CustomButton>
        </Form.Item>
      </Form>
      <LoginMeta>
        <Space direction="vertical" size={20}>
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
        onClick={handleSignUpViaGoogle}
      >
        Sign In with Google
      </CustomButtonGoogle>
    </LoginCard>
  );
};
