import { useState, useContext } from "react";
import { User_user as UserType } from "../../../../lib/api/graphql/queries/";
import {
  Button,
  Typography,
  Space,
  Modal,
  Form,
  Input,
  Divider,
  Tag,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
const { Title } = Typography;

interface Props {
  visibleModal: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}

export const UpdateLocalAccountModal = ({
  visibleModal,
  setVisibleModal,
  user,
}: Props) => {
  const handleCancel = () => {};
  const handleLinkAccount = (data: any) => {
    console.log(data);
  };
  return (
    <Modal
      title={<Title level={3}>Update Local Account</Title>}
      visible={visibleModal}
      maskClosable={false}
      onOk={handleLinkAccount}
      onCancel={() => setVisibleModal(false)}
      footer={null}
    >
      <Title level={5}>
        Your account: <Tag color="#00d2d3">{user.email}</Tag>
      </Title>
      <Form name="modal_view" layout="vertical" onFinish={handleLinkAccount}>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          required
          hasFeedback
        >
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          name={["user", "confirm_password"]}
          label="Confirm password"
          rules={[
            { required: true, message: "Please input your confirm password!" },
          ]}
          required
          hasFeedback
        >
          <Input.Password
            placeholder="Confirm Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Space wrap>
            <Button onClick={() => setVisibleModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Link
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
