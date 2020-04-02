import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { HashRouter } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";

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

// set up apollo upload
const httpLink = createUploadLink({
  uri: graphqlURI,
  headers: {
    authorization: localStorage.getItem("auth-token")
  }
});

const client = new ApolloClient({
  cache,
  uri: graphqlURI,
  link: httpLink,
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

// see if we have a token
const token = localStorage.getItem("auth-token");

// read from localStorage and write to cache as needed
// for initial state
SessionUtil.setInitialCacheState(cache, token);

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
