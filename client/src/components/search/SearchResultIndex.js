import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Queries from '../../graphql/queries';
import RestaurantMap from '../map/RestaurantMap';
import { DEFAULT_LOCATION } from '../../util/map_util';

import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';

const { SEARCH } = Queries;

// SearchResultIndex component returning photo gallery of images from one restaurant from backend
class SearchResultIndex extends Component {
  constructor(props) {
    super(props);
  }

  // Renders the component
  render() {
    // get search term and search location from the url
    let { find_desc, find_loc } = queryString.parse(this.props.location.search);
    find_loc = find_loc || DEFAULT_LOCATION;
    return (
      <div className="search-result-index-wrapper">
        <Navbar />

        <div className="search-result-restaurant-list-wrapper">
          <h1>Best {find_desc || "restaurants"} in {find_loc}</h1>

          <div className="search-result-reservations-menu-wrapper">
            <p>(If we have extra time, make a reservations menu bar here)</p>
          </div>

          <Query query={SEARCH} variables={{ find_desc, find_loc }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading</p>;
              if (error) return <p>{error.message}</p>;

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