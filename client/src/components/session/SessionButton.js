import React from 'react';
import { Link } from 'react-router-dom';
import { ApolloConsumer, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import * as SessionUtil from '../../util/session_util';
import Queries from '../../graphql/queries';

const { IS_LOGGED_IN } = Queries;

const SessionButton = props => {

  const logOutAndRedirect = client => e => {
    e.preventDefault();
    SessionUtil.logOutUser(client);
    props.history.push('/');
  };

  const renderSessionButton = (client, isLoggedIn) => {
    return isLoggedIn ? (
      <div className="login-logout-wrapper"> 
        <button onClick={logOutAndRedirect(client)}>Log Out</button>
      </div>
    ) : (
      <div className="login-logout-wrapper"> 
        <Link to='/login'>Log In</Link>
        <Link to='/signup'>Sign Up</Link> 
      </div>
    );
  }

  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data: { isLoggedIn } }) => renderSessionButton(client, isLoggedIn)}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(SessionButton);
