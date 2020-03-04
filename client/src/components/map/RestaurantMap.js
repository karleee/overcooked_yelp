import React from 'react';
import '../../assets/stylesheets/RestaurantMap.css';

class RestaurantMap extends React.Component {

  constructor(props) {
    super(props);
    this.singleRestaurant = (this.props.restaurants.length === 1);
  }

  componentDidMount() {
    // window.google is defined in App.js
    const google = window.google;

    // set map center coords
    let centerLat;
    let centerLng;
    if (this.singleRestaurant) {
      // center on single restaurant  
      let { coordinates } = this.props.restaurants[0];
      centerLat = coordinates.latitude;
      centerLng = coordinates.longitude;
    } else {
      // use SF coordinates
      // should use user's zipcode (see https://www.zipcodeapi.com/)
      // or center on avg of all restaurants
      centerLat = 37.773972;
      centerLng = -122.431297;
    }


    // set map options
    const mapOptions = {
      center: { lat: centerLat, lng: centerLng },
      zoom: 13
    };

    // render the map
    this.map = new google.maps.Map(
      document.getElementById('restaurant-map'),
      mapOptions
    );

    // place the marker(s) on the map
    this.props.restaurants.forEach(restaurant => {
      const { latitude, longitude } = restaurant.coordinates;
      const position = new google.maps.LatLng(latitude, longitude);
      const marker = new google.maps.Marker({
        position,
        map: this.map
      });
    })
  }

  render() {
    const mapClass = this.singleRestaurant ? "single" : "list";
    return (
      <div id="restaurant-map" className={mapClass}>
        Restaurant Single Map
      </div>
    );
  }
}

export default RestaurantMap;