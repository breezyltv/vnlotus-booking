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

import { from, fromPromise, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { TokenRefreshLink } from "apollo-link-token-refresh";

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
  MyListings,
  MyBookings,
  Wishlist,
} from "./sections";
import { HeaderSkeleton, ErrorBanner } from "./lib/components";
import { displayErrorNotification } from "./lib/utils";
import base64url from "base64url";
import {
  SIGN_IN,
  SignIn as SignInData,
  SignInVariables,
  REFRESH_TOKEN,
} from "./lib/api/graphql/mutations";

//import "./styles/index.css";
import { GlobalStyle, ContentSpinner, SpinnerStyled } from "./styles";
import { Viewer, SettingLeftBarType } from "./lib/types";
import { initViewer, AuthContext, PrivateRoute } from "./lib/auth";
import reportWebVitals from "./reportWebVitals";

//const { Content } = Layout;

const spinIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

let isRefreshingToken = false;
let pendingRequests: any = [];

//handle concurrent Requests
//Only refresh the token once
const resolvePendingRequests = () => {
  pendingRequests.map((callback: any) => callback());
  pendingRequests = [];
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      //console.log(graphQLErrors);

      for (let err of graphQLErrors) {
        // handle errors differently based on its error code
        switch (err.extensions && err.extensions.code) {
          case "UNAUTHENTICATED":
            //displayErrorNotification("401 Unauthorized", err.message);
            // old token has expired throwing AuthenticationError,
            // one way to handle is to obtain a new token and
            // add it to the operation context
            let forward$;
            //get refreshToken
            if (!isRefreshingToken) {
              isRefreshingToken = true;
              forward$ = fromPromise(
                client
                  .mutate({
                    mutation: REFRESH_TOKEN,
                  })
                  .then(({ data }: any) => {
                    console.log("call refresh token ->>", data);
                    if (data && data.refreshToken) {
                      sessionStorage.setItem("csrfToken", data.refreshToken);
                      const headers = operation.getContext().headers;
                      operation.setContext({
                        headers: {
                          ...headers,
                          "X-CSRF-TOKEN": data.refreshToken || "",
                        },
                      });
                    }
                    return true;
                  })
                  .then(() => {
                    resolvePendingRequests();
                    return true;
                  })
                  .catch(() => {
                    pendingRequests = [];
                    return false;
                  })
                  .finally(() => {
                    isRefreshingToken = false;
                  })
              );
            } else {
              //only emit once the Promise is resolved
              forward$ = fromPromise(
                new Promise<void>((resolve) => {
                  pendingRequests.push(() => resolve());
                })
              );
            }
            // Now, pass the modified operation to the next link
            // in the chain. This effectively intercepts the old
            // failed request, and retries it with a new token
            return forward$.flatMap(() => forward(operation));

          case "FORBIDDEN":
            displayErrorNotification("403 FORBIDDEN", err.message);
            return forward(operation);
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      displayErrorNotification(
        "Code 400",
        "We weren't able to connect the server. Please try again later!"
      );
    }
  }
);
const httpLink = createHttpLink({
  uri: "/api",
  credentials: "include",
});

//set token to headers
const authLink = setContext(async () => {
  const csrfToken = sessionStorage.getItem("csrfToken");
  return {
    headers: {
      "X-CSRF-TOKEN": csrfToken || "",
    },
  };
});

interface IExpCode {
  exp: number;
}

const isTokenExpired = (): boolean => {
  const csrfToken = sessionStorage.getItem("csrfToken");
  if (!csrfToken) {
    return false;
  }
  const currentDate = new Date();
  const code = csrfToken.split(".");

  if (code.length !== 2) {
    return false;
  }
  const expCode: IExpCode = JSON.parse(base64url.decode(code[1]));
  console.log(
    "[isTokenExpired] Check Token before send the request to server...",
    expCode,
    currentDate.getTime()
  );

  return expCode.exp < currentDate.getTime() ? true : false;
};

// a middleware to handle expired token before send request
const refreshTokenMiddleware: any = new TokenRefreshLink({
  //the refresh token field name which data returns from backend
  accessTokenField: "refreshToken",
  isTokenValidOrUndefined: () => !isTokenExpired(),
  fetchAccessToken: async () => {
    console.log("[refreshTokenMiddleware] getting new token...");

    return fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": sessionStorage.getItem("csrfToken") as string,
      },
      body: JSON.stringify({
        query: `
        mutation {
          refreshToken
        }
        `,
      }),
    });
  },
  handleFetch: (csrfToken) => {
    if (csrfToken) {
      console.log(
        "[refreshTokenMiddleware] got new csrfToken and set in sessionStorage!"
      );
      sessionStorage.setItem("csrfToken", csrfToken);
    }
  },
  handleError: (err) => {
    //console.warn("Your refresh token is invalid. Try to relogin");
    // displayErrorNotification(
    //   "401 Unauthorized",
    //   "Your refresh token is invalid. Try to relogin!"
    // );
    console.error(err);
  },
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([refreshTokenMiddleware, errorLink, authLink, httpLink]),
  cache,
});

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initViewer);

  const [signIn, { error }] = useMutation<SignInData, SignInVariables>(
    SIGN_IN,
    {
      onCompleted: (data) => {
        if (data && data.signIn) {
          console.log(data.signIn);
          setViewer(data.signIn);
          if (data.signIn.csrfToken) {
            sessionStorage.setItem("csrfToken", data.signIn.csrfToken);
          } else {
            sessionStorage.removeItem("csrfToken");
          }
        }
      },

      onError: (error) => {
        //setViewer(initViewer);
        //sessionStorage.removeItem("csrfToken");
        console.log(error);
      },
    }
  );

  const signInRef = useRef(signIn);

  useEffect(() => {
    document.title = "Lotus Homestays";

    signInRef.current();
  }, []);

  if (!viewer.didRequest && !error && !isRefreshingToken) {
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
  //console.log(error);

  const signInErrorBanner = error ? (
    <ErrorBanner description="We weren't able to verify if you were signed in. Please try again later!" />
  ) : null;

  const isAuthenticated = viewer.id && viewer.csrfToken ? true : false;
  // interface IdParams {
  //   id: string;
  // }
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
          <Route exact path="/Rooms/location/:location" component={Rooms} />
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
          <PrivateRoute
            exact
            path="/user/listings/:id"
            isAuthenticated={isAuthenticated}
            authenticationPath={"/signin"}
            component={MyListings}
          />
          <PrivateRoute
            exact
            path="/user/bookings/:id"
            isAuthenticated={isAuthenticated}
            authenticationPath={"/signin"}
            component={MyBookings}
          />
          <PrivateRoute
            exact
            path="/user/wishlist/:id"
            isAuthenticated={isAuthenticated}
            authenticationPath={"/signin"}
            component={Wishlist}
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
