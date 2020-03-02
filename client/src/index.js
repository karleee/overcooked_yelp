import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HashRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null
});

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    // using the cache we just created
    cache: cache,
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    }
});

const Root = () => {
    return (
        // set up the ApolloProvider tag with the Apollo client we set up earlier
        <ApolloProvider client={client}>
            <HashRouter>
                <App />
            </HashRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
