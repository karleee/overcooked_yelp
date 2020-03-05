import React from 'react';
import { Query } from 'react-apollo';

import Queries from '../../graphql/queries';
const { CURRENT_USER } = Queries;

const ExampleGreeting = () => (
  <Query query={CURRENT_USER}>
    {({ data }) => {
      return (data.currentUserFirstName) ? <p>Hello {data.currentUserFirstName}</p> : <p>Not logged in</p>;
    }}
  </Query>
);

export default ExampleGreeting;