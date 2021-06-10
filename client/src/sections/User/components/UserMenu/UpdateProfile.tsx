import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { User_user as UserType } from "../../../../lib/api/graphql/queries";
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
  haveSameObjects,
  showErrorsBackend,
} from "../../../../lib/utils";
import { IValidateMess } from "../../../../lib/types";
import { CustomButtonPrimary } from "../../../../styles";
import { ErrorBanner, backendErrorMessages } from "../../../../lib/components";
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

interface IProfileData {
  user: UpdatingUserVariables;
}

export const UpdateProfile = ({ user }: Props) => {
  const [loadingImg, setLoadingImg] = useState(false);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [isShowBackendError, setIsShowBackendError] = useState(false);
  const [backendErrors, setBackendErrors] = useState<IValidateMess>({});
  const [userFields, setUserFields] = useState<UserUpdateReturnType>({
    updateUser: {
      __typename: "UserUpdateGQLReturnType",
      data: null,
      errors: null,
    },
  });
  //console.log(user);

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] =
    useMutation<UserUpdateReturnType, UpdatingUserVariables>(UPDATING_USER, {
      onCompleted: (data) => {
        //console.log(data);
        if (!data.updateUser?.errors) {
          setBackendErrors({});
          setUserFields(data);
          displaySuccessNotification(
            "Your profile has been successfully updated!"
          );
        } else {
          setBackendErrors(
            //format validation errors from backend
            showErrorsBackend<IValidateMess, YupError[]>(data.updateUser.errors)
          );
          displayErrorNotification(
            "Some fields are invalid, please check again!"
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
    const birthday = data.user.birthday;

    data.user.birthday =
      birthday &&
      birthday.valueOf() === moment("01/01/1940", dateFormatList[0]).valueOf()
        ? null
        : birthday.valueOf();

    const userBirthday =
      user.birthday &&
      moment(new Date(user.birthday), dateFormatList[0]).valueOf();
    //console.log(birthday.valueOf());
    //console.log(moment(new Date(user.birthday), dateFormatList[0]).valueOf());

    data.user._id = user.id;

    //check if there is some changes for updating
    const testChange: IProfileData["user"] = {
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      bio: user.bio,
      phone: user.phone,
      birthday: userBirthday,
      gender: user.gender,
    };

    // convert all empty characters to null for comparison
    for (const [key, val] of Object.entries(data.user)) {
      if (val === "") {
        data.user[key as keyof IProfileData["user"]] = null;
      }
    }

    // compare update inputs if it changed, can update
    if (!haveSameObjects<IProfileData["user"]>(testChange, data.user)) {
      data.user.birthday = birthday;
      //console.log(data.user);

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
      console.log("[handleOnUpdate] after updated profile: ", userFields);
    } else {
      displayErrorNotification(
        "There is no change in the field!",
        "Update Cancelled!"
      );
    }
  };
  let initialValues;
  const updatedUser = userFields.updateUser?.data;
  if (updatedUser) {
    initialValues = {
      user: {
        ...updatedUser,
        birthday: user.birthday
          ? moment(new Date(user.birthday), dateFormatList[0])
          : moment("01/01/1940", dateFormatList[0]),
      },
    };
  } else {
    initialValues = {
      user: {
        ...user,
        birthday: user.birthday
          ? moment(new Date(user.birthday), dateFormatList[0])
          : moment("01/01/1940", dateFormatList[0]),
      },
    };
  }

  const updateErrorBanner = updateUserError ? (
    <ErrorBanner description="Sorry! We weren't able to update. Please try again later!" />
  ) : null;

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
        onValuesChange={handleFieldsChange}
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
            backendErrorMessages(backendErrors["first_name"]),
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
            backendErrorMessages(backendErrors["last_name"]),
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
            backendErrorMessages(backendErrors["phone"]),
            isShowBackendError
          )}
        >
          <Input maxLength={15} />
        </Form.Item>
        <Form.Item name={["user", "birthday"]} label="Birthday">
          <DatePicker format={dateFormatList} />
        </Form.Item>

        <Form.Item
          name={["user", "gender"]}
          label="Gender"
          {...validateStatus(
            backendErrorMessages(backendErrors["gender"]),
            isShowBackendError
          )}
        >
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
