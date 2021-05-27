import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { User_user as UserType } from "../../../../lib/api/graphql/queries/";
import {
  UPDATING_USER,
  UpdatingUser as UserUpdateReturnType,
  UpdatingUserVariables,
  UpdatingUser_updateUser_errors as YupError,
} from "../../../../lib/api/graphql/mutations";
import { Gender } from "../../../../lib/api/graphql/globalTypes";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  message,
  Image,
  Radio,
  Switch,
  Space,
  Typography,
} from "antd";
import {
  validateStatus,
  displaySuccessNotification,
  displayErrorMessage,
  displayErrorNotification,
} from "../../../../lib/utils";
import { CustomButtonPrimary } from "../../../../styles";
import { ErrorBanner } from "../../../../lib/components";
import moment from "moment";

const { Text } = Typography;

const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

interface Props {
  user: UserType;
}
interface IValidateMess {
  [key: string]: string[];
}

interface IProfileData {
  user: UpdatingUserVariables;
}

export const UpdateProfile = ({ user }: Props) => {
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [isShowBackendError, setIsShowBackendError] = useState(false);
  const [backendErrors, setBackendErrors] = useState<IValidateMess>({});
  // const [userFields, setUserFields] = useState<UserUpdateReturnType>({
  //   updateUser: {
  //     data: null,
  //     errors: null,
  //   },
  // });
  console.log(user);

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] =
    useMutation<UserUpdateReturnType, UpdatingUserVariables>(UPDATING_USER, {
      onCompleted: (data) => {
        console.log(data);
        if (!data.updateUser?.errors) {
          setBackendErrors({});
          displaySuccessNotification("Profile has successfully updated!");
        } else {
          setBackendErrors(showErrorsBackend(data.updateUser.errors));
          displayErrorNotification(
            "The fields are invalid, please check again!"
          );
        }
      },
      onError: (errors) => {
        console.log(errors);
        displayErrorMessage(
          "Sorry! We weren't able to update. Please try again later!"
        );
      },
    });

  const handleChangeUpload = (info: any) => {
    if (info.file.status === "uploading") {
      setLoadingImg(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setLoadingImg(false);
        setImageUrl(imageUrl);
        console.log(imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      <Image src={user.avatar ? user.avatar : undefined} preview={false} />
    </div>
  );
  const handleOnUpdate = async (data: IProfileData) => {
    //const { user } = data;
    data.user._id = user.id;
    console.log(data);

    await updateUser({
      variables: data.user,
      // {
      //   _id: "102692709858534677713",
      //   first_name: "",
      //   last_name: "lee",
      //   phone: "23235df235",
      //   birthday: data.user.birthday,
      //   address: "9969 erma",
      // },
    });
  };

  const initialValues = {
    user: {
      ...user,
      birthday: user.birthday
        ? moment(new Date(user.birthday), dateFormatList[0])
        : moment("01/01/1940", dateFormatList[0]),
    },
  };

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

  const showErrorsBackend = (errors: YupError[] | null): IValidateMess => {
    //console.log(errors);

    const mess: IValidateMess = {};

    errors &&
      errors.forEach((item) => {
        if (mess[item.path]) {
          mess[item.path].push(item.message);
        } else {
          mess[item.path] = [item.message];
        }
      });
    console.log(mess);

    return mess;
  };

  const updateErrorBanner = updateUserError ? (
    <ErrorBanner description="Sorry! We weren't able to update. Please try again later!" />
  ) : null;

  return (
    <>
      {updateErrorBanner}
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChangeUpload}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <br />

      <br />
      <Form
        layout="vertical"
        name="user-update-profile"
        initialValues={initialValues}
        onFinish={handleOnUpdate}
        //validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "first_name"]}
          label="First Name"
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
          hasFeedback
          {...validateStatus(
            generateErrors(backendErrors["first_name"]),
            isShowBackendError
          )}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "last_name"]}
          label="Last name"
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
          hasFeedback
          {...validateStatus(
            generateErrors(backendErrors["last_name"]),
            isShowBackendError
          )}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email">
          <Input disabled={true} value={user.email} />
        </Form.Item>
        <Form.Item
          name={["user", "phone"]}
          label="Phone"
          rules={
            isShowBackendError
              ? []
              : [
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Phone is not a valid number",
                  },
                ]
          }
          hasFeedback
          {...validateStatus(
            generateErrors(backendErrors["phone"]),
            isShowBackendError
          )}
        >
          <Input maxLength={15} />
        </Form.Item>
        <Form.Item name={["user", "birthday"]} label="Birthday">
          <DatePicker format={dateFormatList} />
        </Form.Item>

        <Form.Item name={["user", "gender"]} label="Gender">
          <Radio.Group>
            <Radio value={Gender.male}>Male</Radio>
            <Radio value={Gender.female}>Female</Radio>
            <Radio value={Gender.other}>Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={["user", "address"]} label="Address">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "bio"]} label="Introduce yourself">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Space size={100} align="end">
          <Form.Item>
            <CustomButtonPrimary
              type="primary"
              htmlType="submit"
              loading={updateUserLoading}
              size="large"
            >
              Update Profile
            </CustomButtonPrimary>
          </Form.Item>
          <Form.Item
            label={
              <Text type="warning">
                Show Server-side Validation Messages (for testing)
              </Text>
            }
          >
            <Switch
              onChange={(checked) => {
                setIsShowBackendError(true);
                if (!checked) {
                  setIsShowBackendError(false);
                  setBackendErrors({});
                }
              }}
            />
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};
