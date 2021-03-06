import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import RestaurantInfoContent from './RestaurantInfoContent';
import * as MapUtil from '../../util/map_util';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.singleRestaurant = (this.props.restaurants.length === 1);
    this.redirectToRestaurant = this.redirectToRestaurant.bind(this);
  }

  redirectToRestaurant(restaurant) {
    this.props.history.push(`/restaurants/${restaurant._id}`);
  }

  componentDidMount() {
    // problem: might not rerender if props change without reload

    // window.google is defined in App.js
    // sometimes fails if not reloaded
    const google = window.google;

    // wait til we get coords back from the api
    MapUtil.setOptionsFromLocation(this.props.find_loc) 
    .then(defaultOptions => {
      // render the map
      // consider setting default map options if restaurant.count === 0
      this.map = new google.maps.Map(
        document.getElementById('restaurant-map'),
        defaultOptions
      );

      // before adding markers, set up bounds
      let bounds = new google.maps.LatLngBounds();

      // place the marker(s) on the map
      this.props.restaurants.forEach(restaurant => {
        // create a position object from restaurant coords
        const { latitude, longitude } = restaurant.coordinates;
        const position = new google.maps.LatLng(latitude, longitude);


        // different icons for hover states
        var iconOff = {
          url: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png",
          scaledSize: new google.maps.Size(40, 40),
        };
        var iconOn = {
          url: "https://bonnicilawgroup.com/wp-content/uploads/2015/08/map-marker-icon.png",
          scaledSize: new google.maps.Size(40, 40),
        };


        // place it on the map
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          icon: iconOff
        });

        // only show info window and click redirect if showing a list
        if (this.props.mode === "search" || !this.singleRestaurant) {

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

          // open window and change icon on hover
          marker.addListener('mouseover', function () {
            restaurantInfoWindow.open(this.map, this);
            marker.setIcon(iconOn);
          });

          // close window and revert icon on mouseoff
          marker.addListener('mouseout', function () {
            restaurantInfoWindow.close();
            marker.setIcon(iconOff);
          });
        }

        // extend the bounds to fit this position
        bounds.extend(position);
      })

      // only autozoom & autocenter if we have results
      if (this.props.restaurants.length) {
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
    })
  }

  render() {
    return (
      <div id="restaurant-map" className="map-wrapper"></div> 
    );
  }
}

// add withRouter to give access to history/redirect
export default withRouter(Map);