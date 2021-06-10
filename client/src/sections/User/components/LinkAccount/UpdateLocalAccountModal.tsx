import { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
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
  Switch,
} from "antd";

import { LockOutlined } from "@ant-design/icons";
import {
  LINK_LOCAL_ACCOUNT,
  LinkLocalAccount as LinkLocalData,
  LinkLocalAccountVariables,
} from "../../../../lib/api/graphql/mutations";
import {
  displaySuccessNotification,
  displayErrorNotification,
  showErrorsBackend,
  validateStatus,
} from "../../../../lib/utils/";
import { IValidateMess, YupError } from "../../../../lib/types";
import { backendErrorMessages } from "../../../../lib/components";
const { Title, Text } = Typography;

interface Props {
  visibleModal: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableLinkButton: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}

export const UpdateLocalAccountModal = ({
  visibleModal,
  setVisibleModal,
  setDisableLinkButton,
  user,
}: Props) => {
  const [isShowBackendError, setIsShowBackendError] = useState(false);
  const [backendErrors, setBackendErrors] = useState<IValidateMess>({});
  const [form] = Form.useForm();
  const [linkLocalAccount, { loading: linkLocalLoading }] = useMutation<
    LinkLocalData,
    LinkLocalAccountVariables
  >(LINK_LOCAL_ACCOUNT, {
    onCompleted: ({ linkLocalAccount }) => {
      console.log(linkLocalAccount);

      if (linkLocalAccount && linkLocalAccount.data) {
        setBackendErrors({});
        setVisibleModal(false);
        setDisableLinkButton(true);
        displaySuccessNotification("Your local account has been set!");
      } else if (linkLocalAccount && linkLocalAccount.errors) {
        const backendValidation = showErrorsBackend<IValidateMess, YupError[]>(
          linkLocalAccount.errors
        );
        setBackendErrors(backendValidation);
        displayErrorNotification(
          "Some fields are invalid, please check again!"
        );
      }
    },
    onError: (error) => {
      console.log(error);
      setVisibleModal(false);
      displayErrorNotification(
        "Ohh! Some thing went wrong. please try again later!"
      );
    },
  });

  const handleCancel = () => {
    setVisibleModal(false);
    form.setFieldsValue({ user: { password: "" } });
    form.setFieldsValue({ user: { confirm_password: "" } });
  };
  const handleLinkAccount = async (data: any) => {
    console.log(data);
    await linkLocalAccount({
      variables: {
        ...data.user,
        email: user.email,
      },
    });
  };

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
    <Modal
      title={<Title level={3}>Update Local Account</Title>}
      visible={visibleModal}
      maskClosable={false}
      onOk={handleLinkAccount}
      onCancel={handleCancel}
      footer={null}
    >
      <Title level={5}>
        Your account: <Tag color="#00d2d3">{user.email}</Tag>
      </Title>
      <Form
        name="modal_view"
        layout="vertical"
        form={form}
        onFinish={handleLinkAccount}
        onValuesChange={handleFieldsChange}
      >
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={
            isShowBackendError
              ? []
              : [
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters",
                  },
                ]
          }
          required={!isShowBackendError}
          hasFeedback
          {...validateStatus(
            backendErrorMessages(backendErrors["password"]),
            isShowBackendError
          )}
        >
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          name={["user", "confirm_password"]}
          label="Confirm password"
          rules={
            isShowBackendError
              ? []
              : [
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                  ({ getFieldValue }) => {
                    return {
                      validator(rule, value) {
                        console.log(value);
                        if (
                          !value ||
                          getFieldValue("user")["password"] === value
                        ) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    };
                  },
                ]
          }
          required={!isShowBackendError}
          hasFeedback
          {...validateStatus(
            backendErrorMessages(backendErrors["confirm_password"]),
            isShowBackendError
          )}
        >
          <Input.Password
            placeholder="Confirm Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Space wrap size={20}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={linkLocalLoading}>
              Link
            </Button>
            <Text>Turn off Antd's validation.</Text>
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
        </Form.Item>
      </Form>
    </Modal>
  );
};
