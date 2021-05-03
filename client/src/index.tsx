import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {
  Header,
  Home,
  RoomDetail,
  Host,
  Rooms,
  NotFound,
  User,
  SignIn,
  Profile,
} from "./sections";
import "./styles/index.css";
import { GlobalStyle } from "./styles/index";

import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "/api",
});

const App = () => {
  useEffect(() => {
    document.title = "Lotus Homestay";
  }, []);
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/Room/:id" component={RoomDetail} />
        <Route exact path="/Rooms/:location?" component={Rooms} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/about" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
