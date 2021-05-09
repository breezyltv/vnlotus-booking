import { useEffect, useRef } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Redirect, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SignUpContainer } from "./styles";
import { ErrorBanner } from "../../lib/components";
import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../lib/utils";
import { Banner, Media } from "../Common";
import { SignUpForm } from "./components";
import {
  AUTH_URL,
  AuthUrl as AuthUrlData,
} from "../../lib/api/graphql/queries";
import {
  SIGN_IN,
  SignIn as SignInData,
  SignInVariables,
} from "../../lib/api/graphql/mutations";
import { Viewer } from "././../../lib/types";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}
export const SignUp = ({ viewer, setViewer }: Props) => {
  const client = useApolloClient();
  const [
    signIn,
    { data: signInData, loading: signInLoading, error: signInError },
  ] = useMutation<SignInData, SignInVariables>(SIGN_IN, {
    onCompleted: (data) => {
      if (data && data.signIn && data.signIn.token) {
        setViewer(data.signIn);

        sessionStorage.setItem("token", data.signIn.token);

        displaySuccessNotification("You've successfully logged in!");
      }
    },
  });

  const signInRef = useRef(signIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      signInRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  const handleSignUp = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({ query: AUTH_URL });
      window.location.href = data.authUrl;
    } catch (error) {
      displayErrorMessage(
        "Sorry! We weren't able to sign you in. Please try again later!"
      );
    }
  };

  if (signInData && signInData.signIn) {
    const { id: viewerId } = signInData.signIn;

    return <Redirect to={`/user/${viewerId}`} />;
  }

  if (viewer.token) {
    return <Redirect to={`/user/${viewer.id}`} />;
  }
  const signInErrorBanner = signInError ? (
    <ErrorBanner description="Sorry! We weren't able to sign you in. Please try again later!" />
  ) : null;

  return (
    <>
      {signInErrorBanner}
      <Banner />

      <SignUpContainer>
        <Row gutter={[15, 0]} justify="center">
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            lg={{ span: 16, order: 1 }}
          >
            <Media />
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 8, order: 2 }}
          >
            <SignUpForm handleSignUp={handleSignUp} />
          </Col>
        </Row>
      </SignUpContainer>
    </>
  );
};