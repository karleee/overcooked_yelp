import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/RestaurantIndex.css';

const { FETCH_RESTAURANTS } = Queries; 

// RestaurantIndex component returning information about all restaurants from backend
const RestaurantIndex = () => {  
  return (
    <Query query={FETCH_RESTAURANTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return 'Oops! Something went wrong. Pleae try again later.';

        return (
          <div className="restaurant-index thumbnails-wrapper">
            <ul>
              {data.restaurants.map(restaurant => {
                // Converting price for each restaurant into dollar sign equivalents
                const price = restaurant.price;
                let dollars = [];
                const min = 1;
                const max = 7;
                let weeks;

                for (let i = 0; i < price; i++) {
                  dollars.push('$');
                }

                dollars.join('');

                // Creating a random week indicator for newly opened restaurants
                weeks = Math.floor(Math.random() * (max - min) + min);

                return (
                  <li key={restaurant._id}>
                    <Link to={`/restaurants/${restaurant._id}`}>
                      <img src={restaurant.photos[0] ? restaurant.photos[0].url : ''} alt="Restaurant thumbnail" />

                      <div className="restaurant-index text-wrapper">
                        <h3>{restaurant.name}</h3>

                        <div className="restaurant-index price-and-category-wrapper">
                          <p>{dollars}</p>
                          <p className="restaurant-index dot-wrapper">•</p>
                          <p>{restaurant.category}</p>
                        </div>

                        <p>{restaurant.location.city}, {restaurant.location.state}</p>

                        <div className="restaurant-detail open-wrapper">
                          <img src="/images/homepage/fire_icon.png" alt="Fire" />
                          <p>Opened {weeks} {weeks > 1 ? 'weeks' : 'week'} ago</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default RestaurantIndex;