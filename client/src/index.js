<<<<<<< HEAD
// React setup
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

// Apollo setup
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';

// Local file imports
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// Mapping objects to mongo _id to set up Apollo cache
=======
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
>>>>>>> master
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

<<<<<<< HEAD
// Using apollo-link-http library to carry data between backend and frontend server
// Makes requests over HTTP to the graphql endpoint to get info from backend
// Verifies user by sending auth token in the headers up with every request
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: localStorage.getItem('auth-token')
  }
});

// Configuring onError from apollo-link-error library to log any errors received
// from backend
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

// Configuring client:
// link – tells cache how to fetch data
// cache – the cache we just configured before
// onError – specifies how to handle errors
const client = new ApolloClient({
  link: httpLink,
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

// Creating a Root component to wrap the application in
=======
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

>>>>>>> master
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
<<<<<<< HEAD
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
=======
};

ReactDOM.render(<Root />, document.getElementById("root"));
>>>>>>> master
