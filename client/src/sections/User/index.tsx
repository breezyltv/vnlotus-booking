import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../lib/auth/AuthProvider";
import {
  USER_PROFILE,
  User as UserType,
  UserVariables,
} from "../../lib/api/graphql/queries/";
import { Row, Col } from "antd";
import { UserContainer, InfoBarHeader } from "./styles";
import { RouteComponentProps } from "react-router-dom";
import {
  LeftSettingTab,
  UpdateProfile,
  ChangePassword,
  Payment,
  LinkAccount,
  InfoLeftBar,
} from "./components";
import { SettingLeftBarType } from "../../lib/types";
import { ErrorBanner, PageSkeleton } from "../../lib/components";

// interface IdMatchParams {
//   id: string;
// }

interface IMatchParams {
  [x: string]: string | undefined;
}
interface Props extends RouteComponentProps<IMatchParams> {
  selectedKeys: SettingLeftBarType;
}

type SettingType = {
  [key: string]: JSX.Element;
};

export const User = ({ selectedKeys, match }: Props) => {
  const { viewer } = useContext(AuthContext);
  //console.log(match.params.id);
  //console.log("[User] viewer", viewer.id);

  const {
    data,
    loading: loadingUserProfile,
    error: getUserProfileError,
  } = useQuery<UserType, UserVariables>(USER_PROFILE, {
    variables: {
      id: match.params.id ? match.params.id : "",
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const isUser = true;
  let accountSettingComp: SettingType = {};
  if (data) {
    //console.log(data);

    accountSettingComp = {
      "1": <UpdateProfile user={data.user} />,
      "2": <ChangePassword />,
      "3": <Payment />,
      "4": <LinkAccount user={data.user} />,
    };
  }
  const getUserProfileErrorBanner = getUserProfileError ? (
    <ErrorBanner description="Sorry! We weren't able to load profile. Please try again later!" />
  ) : null;
  return (
    <div>
      {getUserProfileErrorBanner}
      <InfoBarHeader>
        <UserContainer>
          <InfoLeftBar selectedKeys={selectedKeys} />
        </UserContainer>
      </InfoBarHeader>
      <UserContainer>
        <Row gutter={[35, 0]} justify="center">
          <Col xs={24} md={8} lg={8}>
            <LeftSettingTab selectedKeys={selectedKeys} isUser={isUser} />
          </Col>
          <Col xs={24} md={16} lg={16}>
            {loadingUserProfile ? (
              <PageSkeleton numberOfSkeletons={3} numberOfRows={5} />
            ) : (
              accountSettingComp[selectedKeys]
            )}
          </Col>
        </Row>
      </UserContainer>
    </div>
  );
};
