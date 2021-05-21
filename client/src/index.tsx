import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Layout, Affix, BackTop } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //RouteComponentProps,
} from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";

import {
  Header,
  Home,
  RoomDetail,
  Host,
  Rooms,
  NotFound,
  User,
  SignIn,
  SignUp,
  Profile,
  Footer,
} from "./sections";
import { HeaderSkeleton, ErrorBanner } from "./lib/components";
import {
  SIGN_IN,
  SignIn as SignInData,
  SignInVariables,
} from "./lib/api/graphql/mutations";
import "./styles/index.css";
import { GlobalStyle, ContentSpinner, SpinnerStyled } from "./styles";
import { Viewer, SettingLeftBarType } from "./lib/types";
import { initViewer, AuthContext, PrivateRoute } from "./lib/auth";
import reportWebVitals from "./reportWebVitals";

//const { Content } = Layout;

const spinIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const client = new ApolloClient({
  uri: "/api",
  request: async (operation) => {
    const token = sessionStorage.getItem("token");
    operation.setContext({
      headers: {
        "X-CSRF-TOKEN": token || "",
      },
    });
  },
});

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initViewer);

  const [signIn, { error }] = useMutation<SignInData, SignInVariables>(
    SIGN_IN,
    {
      onCompleted: (data) => {
        if (data && data.signIn) {
          //console.log(data.signIn);
          setViewer(data.signIn);
          if (data.signIn.token) {
            sessionStorage.setItem("token", data.signIn.token);
          } else {
            sessionStorage.removeItem("token");
          }
        }
      },
    }
  );

  const signInRef = useRef(signIn);

  useEffect(() => {
    document.title = "Lotus Homestays";

    signInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout>
        <HeaderSkeleton />
        <ContentSpinner>
          <SpinnerStyled
            className="lazyContent"
            tip="Lotus is preparing..."
            indicator={spinIcon}
            size="large"
          />
        </ContentSpinner>
      </Layout>
    );
  }

  const signInErrorBanner = error ? (
    <ErrorBanner description="We weren't able to verify if you were signed in. Please try again later!" />
  ) : null;

  const isAuthenticated = viewer.id && viewer.token ? true : false;
  interface IdParams {
    id: string;
  }
  return (
    <AuthContext.Provider value={{ viewer }}>
      <Router>
        <GlobalStyle />
        {signInErrorBanner}
        <Affix offsetTop={0}>
          <Header viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/Room/:id" component={RoomDetail} />
          <Route exact path="/Rooms/:location?" component={Rooms} />
          <PrivateRoute
            exact
            path="/user/edit-account/profile/:id"
            isAuthenticated={isAuthenticated}
            authenticationPath={"/signin"}
            render={(props) => (
              <User {...props} selectedKeys={SettingLeftBarType.PROFILE} />
            )}
          />
          <PrivateRoute
            exact
            path="/user/edit-account/change-password/:id"
            isAuthenticated={isAuthenticated}
            authenticationPath={"/signin"}
            render={(props) => (
              <User
                {...props}
                selectedKeys={SettingLeftBarType.CHANGE_PASSWORD}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/user/edit-account/payment/:id"
            isAuthenticated={isAuthenticated}
            authenticationPath={"/signin"}
            render={(props) => (
              <User {...props} selectedKeys={SettingLeftBarType.PAYMENT} />
            )}
          />
          <PrivateRoute
            exact
            path="/user/edit-account/link-account/:id"
            isAuthenticated={isAuthenticated}
            authenticationPath={"/signin"}
            render={(props) => (
              <User {...props} selectedKeys={SettingLeftBarType.LINK_ACCOUNT} />
            )}
          />
          <Route
            exact
            path="/signin"
            render={(props) => (
              <SignIn {...props} viewer={viewer} setViewer={setViewer} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <SignUp {...props} viewer={viewer} setViewer={setViewer} />
            )}
          />

          <Route exact path="/about" component={Profile} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Layout style={{ background: "#fff" }}>
        <App />
        <BackTop />
      </Layout>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
