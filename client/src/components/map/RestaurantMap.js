import React from 'react';
import '../../assets/stylesheets/RestaurantMap.css';


class RestaurantMap extends React.Component {
  
  constructor(props) {
    super(props);
    // move all this to render?
    this.singleRestaurant = (this.props.restaurants.length === 1);
  }

  getAveragedCenter(restaurants) {
    // holder variables to be returned
    let lat, lng;
    // let minLat, maxLat, minLng, maxLng;

    // set initial mins and maxs to the first restaurant
    let { coordinates } = restaurants[0];
    let minLat = coordinates.latitude;
    let maxLat = coordinates.latitude;
    let minLng = coordinates.longitude;
    let maxLng = coordinates.longitude;
    // calculate mins and maxes
    restaurants.forEach(restaurant => {
      let rLat = restaurant.coordinates.latitude;
      let rLng = restaurant.coordinates.longitude;
      if (rLat < minLat) minLat = rLat;
      if (rLat > maxLat) maxLat = rLat;
      if (rLng < maxLng) minLng = rLng;
      if (rLng > maxLng) maxLng = rLng;
    });

    lat = (minLat + maxLat)/2;
    lng = (minLng + maxLng)/2;
    return { lat, lng };
  }

  componentDidMount() {
    // move all this to render?
    // problem: will not rerender if props change without reload
    // might be ok for now

    // window.google is defined in App.js
    // need to ensure this is loaded
    const google = window.google;

    // render the map
    // consider setting default map options if restaurant.count === 0
    this.map = new google.maps.Map(document.getElementById('restaurant-map'));

    // before adding markers, set up bounds
    let bounds = new google.maps.LatLngBounds();

    // place the marker(s) on the map
    this.props.restaurants.forEach(restaurant => {
      // get restaurant coords
      const { latitude, longitude } = restaurant.coordinates;
      // create a position object
      const position = new google.maps.LatLng(latitude, longitude);
      // place it on the map
      const marker = new google.maps.Marker({
        position,
        map: this.map
      });
      // extend the bounds to fit this position
      bounds.extend(position);
    })

    // auto-zoom & auto-center
    this.map.fitBounds(bounds);
    let theMap = this.map;
    var listener = google.maps.event.addListener(theMap, "idle", function () {
      if (theMap.getZoom() > 16) theMap.setZoom(16);
      google.maps.event.removeListener(listener);
    });
    this.map.panToBounds(bounds);
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