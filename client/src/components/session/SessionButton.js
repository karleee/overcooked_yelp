import React from "react";
import { Link } from "react-router-dom";
import { ApolloConsumer, Query } from "react-apollo";
import { withRouter } from "react-router";

import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const SessionButton = props => {

  const logOutAndRedirect = client => e => {
    e.preventDefault();
    localStorage.removeItem("auth-token");
    client.writeData({ data: { isLoggedIn: false } });
    props.history.push("/");
  };

  const renderSessionButton = (client, isLoggedIn) => {
    return isLoggedIn ? (
      <button onClick={logOutAndRedirect(client)}>Logout</button>
    ) : (
      <div>
        <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data: { isLoggedIn} }) => renderSessionButton(client, isLoggedIn)}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(SessionButton);
