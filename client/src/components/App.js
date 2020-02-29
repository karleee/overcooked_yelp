import React from "react";
import { Query } from "react-apollo";
import { Route } from "react-router-dom";

import Queries from "../graphql/queries";
const { FETCH_USERS } = Queries;

const _TempUserList = () => (
  <Query query={FETCH_USERS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (
        <ul>
          {data.users.map(user => (
            <li key={user._id}>{`${user.firstName} ${user.lastName}`}</li>
          ))}
        </ul>
      );
    }}
  </Query>
);

const _TempHomePage = () => <h1>Temporary Homepage!</h1>;

const App = () => {
  return (
    <div>
      <Route path="/users" component={_TempUserList} />
      <Route exact path="/" component={_TempHomePage} />
    </div>
  );
};

export default App;
