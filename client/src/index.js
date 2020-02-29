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
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

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
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
