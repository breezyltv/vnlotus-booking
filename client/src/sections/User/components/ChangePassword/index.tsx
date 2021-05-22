import { Form, Input, Button } from "antd";
export const ChangePassword = () => {
  const handleOnUpdate = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Form
        layout="vertical"
        name="user-update-profile"
        onFinish={handleOnUpdate}
      >
        <Form.Item
          name={["user", "current_password"]}
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
            {
              max: 30,
              message: "Password cannot be longer than 30 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
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
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
