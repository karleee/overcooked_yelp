import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';

const { FETCH_RESTAURANTS } = Queries; 

// RestaurantIndex component returning information about all restaurants from backend
const RestaurantIndex = () => {
  return (
    <Query query={FETCH_RESTAURANTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <div>
            <ul>
              {data.restaurants.map(restaurant => (
                <li key={restaurant._id}><Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link></li>
              ))}
            </ul> 
          </div>
        );
      }}
    </Query>
  );
};

export default RestaurantIndex;