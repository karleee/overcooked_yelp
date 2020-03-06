import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Queries from '../../graphql/queries';
import RestaurantMap from '../map/RestaurantMap';
const { SEARCH } = Queries;

// SearchResultIndex component returning photo gallery of images from one restaurant from backend
class SearchResultIndex extends Component {
  constructor(props) {
    super(props);
  }

  // Renders the component
  render() {
    let { find_desc } = queryString.parse(this.props.location.search);
    return (
      <div className="search-result-index-wrapper">
        <Navbar />

        <div className="search-result-restaurant-list-wrapper">
          <h1>Best food in (put user's searched city/location here)</h1>

          <div className="search-result-reservations-menu-wrapper">
            <p>(If we have extra time, make a reservations menu bar here)</p>
          </div>

          <h2>All Results for "{find_desc}"</h2>

          <Query query={SEARCH} variables={{ find_desc }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading</p>;
              if (error) return <p>Error</p>;
              console.log("DATA", data.search);
              let restaurants = data.search;
              if (restaurants.length) {
                return (
                  <div>
                    <div>
                      {restaurants.map(restaurant => <p>{restaurant.name}</p>)}
                    </div>
                    <div>
                      <RestaurantMap
                        restaurants={restaurants}
                        mode="search"
                      />
                    </div>
                  </div>
                );
              } else {
                return <p>nothing to shaquille o'neal</p>
              }
            }}
          </Query>

          <ul>
            <p>
              (Just a note: Get restaurants into an array, map over them, use more divs to separate
              out content inside of thumbnails/to enable the display flex css styling properties)
            </p>

            <li>Put restaurant thumbnail here</li>
          </ul>
        </div>

        <div className="search-result-map-wrapper">
          <div className="search-result-map-image-wrapper"></div>
        </div>
      </div>
    );
  }
};

export default withRouter(SearchResultIndex);