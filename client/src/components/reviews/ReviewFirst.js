import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';

import ProgressLoader from '../loader/ProgressLoader';
import Navbar from '../navbar/Navbar';
import SearchForm from '../search/SearchForm';

import '../../assets/stylesheets/ReviewFirst.css';

const { FETCH_RESTAURANTS } = Queries; 

const ReviewFirst = () => {
  return (
    <Query query={FETCH_RESTAURANTS}>
      {({ loading, error, data }) => {
        if (loading) return <ProgressLoader type='loading' />;
        if (error) return <ProgressLoader type='error' />;

        // Get the first six restaurants
        // const restaurants = data.restaurants.slice(0, 5);
        const restaurants = data.restaurants;

        return (
          <div className="first-review-container">
            <Navbar />

            <div className="first-review-banner-wrapper">
              <div className="banner-text-wrapper">
                <h1>Your First Review Awaits</h1>
                <p>Review your favorite businesses and share your experiences with our community. Need a little help getting started? Stay tuned for a future tip page.</p>
                <SearchForm />
              </div>

              <div className="banner-thumbnail-wrapper">
                <img src="/images/review/first_review_banner.png" alt="Review banner" />
              </div>
            </div>

            <div className="first-review-businesses-wrapper">
              <h2>Been to these businesses recently?</h2>

              <ul>
                {restaurants.map(restaurant => {
                  return (
                    <li>
                      <div className="restaurant-thumbnail-wrapper">
                        <img src={restaurant.photos[0] ? restaurant.photos[0].url : ''} alt="Restaurant thumbnail" />
                      </div>

                      <div className="restaurant-text-wrapper">
                        <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
                        <p>{restaurant.location.streetAddress}</p> 

                        <div className="restaurant-text-rating-wrapper">
                          {/* <img src="/images/restaurant_detail/ratings/zero.png" alt="Star rating" /> */}
                          <i className="rating-image"></i>

                          <div className="one-star-wrapper"></div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default ReviewFirst;