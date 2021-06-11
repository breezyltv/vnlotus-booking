import { useEffect, useRef, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import { SignUpContainer } from "./styles";
import { ErrorBanner } from "../../lib/components";
import {
  displaySuccessNotification,
  displayErrorMessage,
  showErrorsBackend,
  displayErrorNotification,
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
  REGISTER,
  RegisterUser as RegisterData,
  RegisterUserVariables,
  RegisterUser_register_errors as YupError,
} from "../../lib/api/graphql/mutations";
import { Viewer, IValidateMess } from "././../../lib/types";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}
interface IRegisterData {
  user: RegisterUserVariables;
}
export const SignUp = ({ viewer, setViewer }: Props) => {
  const client = useApolloClient();
  const showBackendError = useState(false);
  const [backendErrors, setBackendErrors] = useState<IValidateMess>({});
  const [
    signIn,
    { data: signInData, loading: signInLoading, error: signInError },
  ] = useMutation<SignInData, SignInVariables>(SIGN_IN, {
    onCompleted: (data) => {
      if (data && data.signIn && data.signIn.csrfToken) {
        setViewer(data.signIn);

        sessionStorage.setItem("csrfToken", data.signIn.csrfToken);

        displaySuccessNotification("You've successfully logged in!");
      }
    },
  });

  const [
    register,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation<RegisterData, RegisterUserVariables>(REGISTER, {
    onCompleted: ({ register }) => {
      console.log(register);
      if (register && register.data.csrfToken && !register.errors) {
        setViewer(register.data);
        setBackendErrors({});
        sessionStorage.setItem(
          "csrfToken",
          register.data.csrfToken ? register.data.csrfToken : ""
        );

        displaySuccessNotification("Welcome you to Lotus homestay!");
      } else if (register && register.data && register.errors) {
        //format validation errors from backend
        const backendValidation = showErrorsBackend<IValidateMess, YupError[]>(
          register.errors
        );
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

  const handleSignUpViaGoogle = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({ query: AUTH_URL });
      window.location.href = data.authUrl;
    } catch (error) {
      displayErrorMessage(
        "Sorry! We weren't able to sign you in. Please try again later!"
      );
    }
  };

  const handleSignUpViaEmail = async (data: IRegisterData) => {
    //console.log(data);
    await register({
      variables: data.user,
    });
    // await client.mutate<RegisterData, RegisterVariables>({
    //   mutation: REGISTER,
    //   variables: data.user,
    // });
  };

  if (signInData && signInData.signIn) {
    const { id: viewerId } = signInData.signIn;

    return <Redirect to={`/user/edit-account/profile/${viewerId}`} />;
  }
  if (registerData && registerData.register.data.csrfToken) {
    const { id: viewerId } = registerData.register.data;

    return <Redirect to={`/user/edit-account/profile/${viewerId}`} />;
  }

  if (viewer.csrfToken) {
    return <Redirect to={`/user/edit-account/profile/${viewer.id}`} />;
  }
  const signInErrorBanner =
    signInError || registerError ? (
      <ErrorBanner description="Sorry! We weren't able to sign you in. Please try again later!" />
    ) : null;

  return (
    <>
      {signInErrorBanner}
      <Banner
        title="Sign up for more promotions and benefits"
        description="Swift, convenient, and safe. Sign up now for more interests."
      />

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
            <SignUpForm
              handleSignUpViaGoogle={handleSignUpViaGoogle}
              handleSignUpViaEmail={handleSignUpViaEmail}
              signInLoading={signInLoading}
              showBackendError={showBackendError}
              registerLoading={registerLoading}
              backendErrors={backendErrors}
              setBackendErrors={setBackendErrors}
            />
          </Col>
        </Row>
      </SignUpContainer>
    </>
  );
};
