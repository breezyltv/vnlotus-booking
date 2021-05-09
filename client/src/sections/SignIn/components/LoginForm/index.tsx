import { Link } from "react-router-dom";
import { Typography, Form, Space, Divider } from "antd";
import {
  CustomInput,
  CustomInputPassword,
  CustomButton,
  CustomButtonGoogle,
} from "../../../../styles";
import { LoginCard, LoginHeader, LoginMeta } from "../../styles";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
interface Props {
  handleAuthorizeViaGoogle: () => void;
}
export const LoginForm = ({ handleAuthorizeViaGoogle }: Props) => {
  return (
    <LoginCard>
      <LoginHeader>
        <Title level={2}>Sign In</Title>
        <Text>...for more experiences</Text>
      </LoginHeader>
      <Form>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <CustomInput placeholder="Email address" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <CustomInputPassword
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <CustomButton htmlType="submit" size="large" block>
            Sign In
          </CustomButton>
        </Form.Item>
      </Form>
      <LoginMeta>
        <Space direction="vertical" size={20}>
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
        icon={<GoogleOutlined />}
        size="large"
        block
        onClick={handleAuthorizeViaGoogle}
      >
        Sign In with Google
      </CustomButtonGoogle>
    </LoginCard>
  );
};
