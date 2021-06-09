import { useEffect, useRef, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LoginContainer, SpinnerStyled, ContentSpinner } from "./styles";
import { ErrorBanner } from "../../lib/components";
import {
  displaySuccessNotification,
  displayErrorNotification,
  displayErrorMessage,
  showErrorsBackend,
} from "../../lib/utils";
import { Banner, Media } from "../Common";
import { LoginForm } from "./components";
import {
  AUTH_URL,
  AuthUrl as AuthUrlData,
} from "../../lib/api/graphql/queries";
import {
  SIGN_IN,
  SignIn as SignInData,
  SignInVariables,
  SIGN_IN_VIA_EMAIL,
  SignInViaEmail as SignInViaEmailData,
  SignInViaEmailVariables,
  SignInViaEmail_signInViaEmail_errors as YupError,
} from "../../lib/api/graphql/mutations";
import { Viewer, IValidateMess } from "././../../lib/types";

const spinIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}
export const SignIn = ({ viewer, setViewer }: Props) => {
  const client = useApolloClient();
  const showBackendError = useState(false);
  const [backendErrors, setBackendErrors] = useState<IValidateMess>({});
  const [
    signIn,
    { data: signInData, loading: signInLoading, error: signInError },
  ] = useMutation<SignInData, SignInVariables>(SIGN_IN, {
    onCompleted: (data) => {
      console.log("after logged in: ", data);

      if (data && data.signIn && data.signIn.csrfToken) {
        setViewer(data.signIn);

        sessionStorage.setItem("csrfToken", data.signIn.csrfToken);

        displaySuccessNotification("You've successfully logged in!");
      }
    },
  });

  const [
    signInViaEmail,
    {
      data: signInViaEmailData,
      loading: signInViaEmailLoading,
      error: signInViaEmailError,
    },
  ] = useMutation<SignInViaEmailData, SignInViaEmailVariables>(
    SIGN_IN_VIA_EMAIL,
    {
      onCompleted: ({ signInViaEmail }) => {
        console.log(signInViaEmail);
        if (signInViaEmail && signInViaEmail.data.csrfToken) {
          console.log("viewer", signInViaEmail.data);

          setViewer(signInViaEmail.data);
          setBackendErrors({});
          sessionStorage.setItem(
            "csrfToken",
            signInViaEmail.data.csrfToken ? signInViaEmail.data.csrfToken : ""
          );

          displaySuccessNotification("Welcome you to Lotus homestay!");
        } else if (
          signInViaEmail &&
          signInViaEmail.data &&
          signInViaEmail.errors
        ) {
          //format validation errors from backend
          const backendValidation = showErrorsBackend<
            IValidateMess,
            YupError[]
          >(signInViaEmail.errors);
          setBackendErrors(backendValidation);
          displayErrorNotification(
            "Some fields are invalid, please check again!"
          );
        }
      },
      onError: (error) => {
        console.log("[register] error", error);
        displayErrorNotification(error.message);
      },
    }
  );

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

  const handleAuthorizeViaGoogle = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({ query: AUTH_URL });
      window.location.href = data.authUrl;
    } catch (error) {
      //console.log("signInError", error);
      displayErrorMessage(
        "Sorry! We weren't able to sign you in. Please try again later!"
      );
    }
  };
  const handleSignInViaEmail = async (data: SignInViaEmailVariables) => {
    console.log(data);

    await signInViaEmail({ variables: data });
  };

  if (signInLoading) {
    return (
      <ContentSpinner>
        <SpinnerStyled
          className="lazyContent"
          tip="Signing you in..."
          indicator={spinIcon}
          size="large"
        />
      </ContentSpinner>
    );
  }

  if (signInData && signInData.signIn) {
    const { id: viewerId } = signInData.signIn;

    return <Redirect to={`/user/edit-account/profile/${viewerId}`} />;
  }
  if (
    signInViaEmailData &&
    signInViaEmailData?.signInViaEmail &&
    signInViaEmailData.signInViaEmail.data.csrfToken
  ) {
    const { id: viewerId } = signInViaEmailData.signInViaEmail.data;

    return <Redirect to={`/user/edit-account/profile/${viewerId}`} />;
  }
  if (viewer.csrfToken) {
    return <Redirect to={`/user/edit-account/profile/${viewer.id}`} />;
  }
  const signInErrorBanner =
    signInError || signInViaEmailError ? (
      <ErrorBanner description="Sorry! We weren't able to sign you in. Please try again later!" />
    ) : null;

  return (
    <>
      {signInErrorBanner}
      <Banner
        title="Sign in for more promotions and benefits"
        description="Swift, convenient, and safe. Sign in now for more interests."
      />

      <LoginContainer>
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
            <LoginForm
              handleAuthorizeViaGoogle={handleAuthorizeViaGoogle}
              handleSignInViaEmail={handleSignInViaEmail}
              signInViaEmailLoading={signInViaEmailLoading}
              showBackendError={showBackendError}
              backendErrors={backendErrors}
              setBackendErrors={setBackendErrors}
            />
          </Col>
        </Row>
      </LoginContainer>
    </>
  );
};
