import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import Navbar from '../navbar/Navbar';
import Map from '../map/Map';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/RestaurantMap.css';

const { FETCH_RESTAURANT } = Queries;

// RestaurantIndex component returning information about all restaurants from backend
// Scrolls automatically to top of the page
class RestaurantMap extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Query query={FETCH_RESTAURANT} variables={{ _id: this.props.match.params.id }}> 
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          
          return (
            <div className="full-map-container">
              <Navbar />

              <div className="map-main-content-container">
                <Map restaurants={[data.restaurant]} />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default RestaurantMap;