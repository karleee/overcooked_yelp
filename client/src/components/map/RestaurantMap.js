import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/RestaurantMap.css';


const RestaurantInfoContent = ({ restaurant }) => (
  <div className="restaurant-info-content">
    <img src="https://via.placeholder.com/150x75" />
    <h3>{restaurant.name}</h3>
    <p>need avg reviews here</p>
    <p>{restaurant.category}</p>
  </div>
);

class RestaurantMap extends React.Component {
  
  constructor(props) {
    super(props);
    // move all this to render?
    this.singleRestaurant = (this.props.restaurants.length === 1);
    this.redirectToRestaurant = this.redirectToRestaurant.bind(this);
  }

  redirectToRestaurant(restaurant) {
    this.props.history.push(`/restaurants/${restaurant.id}`);
  }

  componentDidMount() {
    // problem: might not rerender if props change without reload
    // move all this to render?
    // works ok for now

    // window.google is defined in App.js
    // sometimes fails if not reloaded
    const google = window.google;

    // render the map
    // consider setting default map options if restaurant.count === 0
    this.map = new google.maps.Map(document.getElementById('restaurant-map'));

    // before adding markers, set up bounds
    let bounds = new google.maps.LatLngBounds();

    // place the marker(s) on the map
    this.props.restaurants.forEach(restaurant => {
      // create a position object from restaurant coords
      const { latitude, longitude } = restaurant.coordinates;
      const position = new google.maps.LatLng(latitude, longitude);

      // place it on the map
      const marker = new google.maps.Marker({
        position,
        map: this.map
      });

      // only show info window and click redirect if showing a list
      if (!this.singleRestaurant) {

        // redirect to the restaurant_show page on click
        marker.addListener('click', () => this.redirectToRestaurant(restaurant));

        // create a DOM element to render info to
        let restaurantInfoNode = document.createElement("div");

        // render the info to the DOM element
        ReactDOM.render(<RestaurantInfoContent restaurant={restaurant} />, restaurantInfoNode);

        // create an info window out of the DOM element
        let restaurantInfoWindow = new google.maps.InfoWindow({
          content: restaurantInfoNode,
          map: this.map,
          position
        });

        // close the info window once created
        restaurantInfoWindow.close();

        // register mouseover events for info window stuff
        marker.addListener('mouseover', function () {
          restaurantInfoWindow.open(this.map, this);
        });
        marker.addListener('mouseout', function () {
          restaurantInfoWindow.close();
        });
      } 

      // extend the bounds to fit this position
      bounds.extend(position);
    })

    // auto-zoom
    this.map.fitBounds(bounds);
    
    // zoom out a bit if we're too zoomed in
    let theMap = this.map;
    var listener = google.maps.event.addListener(theMap, "idle", function () {
      if (theMap.getZoom() > 16) theMap.setZoom(16);
      google.maps.event.removeListener(listener);
    });

    // auto-center
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

// add withRouter to give access to history/redirect
export default withRouter(RestaurantMap);