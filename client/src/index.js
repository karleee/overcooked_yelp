import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { HashRouter } from "react-router-dom";

import * as SessionUtil from "./util/session_util";
import App from "./components/App";
import Mutation from "./graphql/mutations";
const { VERIFY_USER } = Mutation;


// Begin Apollo Setup 
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

// when settled, move this to keys + env + heroku
let graphqlURI;
if (process.env.NODE_ENV === "production") {
  graphqlURI = "/graphql";
} else {
  graphqlURI = "http://localhost:5000/graphql";
}

const client = new ApolloClient({
  cache,
  uri: graphqlURI,
  onError: ({ networkError, graphQLErrors }) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  },
  // this attaches the headers on every request, not just on page load
  request: operation => {
    const token = localStorage.getItem("auth-token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

// if we have a token we want to verify the user is actually logged in
const token = localStorage.getItem("auth-token");
const currentUserId = localStorage.getItem("currentUserId");
const currentUserFirstName = localStorage.getItem("currentUserFirstName");
const currentUserLastName = localStorage.getItem("currentUserLastName");

// we'll check localStorage to see if a token exists
cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    currentUserId,
    currentUserFirstName,
    currentUserLastName
  }
});

// then if we do have a token we'll go through with our mutation
if (token) {
  client
  .mutate({ mutation: VERIFY_USER, variables: { token } })
  .then(({ data }) => {
    SessionUtil.saveUserToCacheAndLocalStorage(cache, data.verifyUser)
  });
  // handle logout on expiry?
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
