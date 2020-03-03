import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import Navbar from '../navbar/Navbar';

const { FETCH_RESTAURANT } = Queries;

// RestaurantIndex component returning information about all restaurants from backend
// Scrolls automatically to top of the page
class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      viewMoreAmenities: false
    }
    this.toggleAmenities = this.toggleAmenities.bind(this);
  }

  toggleAmenities() {
    this.setState({ viewMoreAmenities: !this.state.viewMoreAmenities });
  }

  render() {
    return (
      <Query query={FETCH_RESTAURANT} variables={{ _id: this.props.match.params.id }}> 
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          // Converting price into dollar sign equivalents
          const price = data.restaurant.price;
          let dollars = [];

          for (let i = 0; i < price; i++) {
            dollars.push('$');
          }

          dollars.join('');

          // Getting current time
          const currentDate = new Date();
          const currentHour = currentDate.getHours();
          const currentMinutes = currentDate.getMinutes();
          const currentDay = currentDate.getDay();
          const ampm = (currentHour >= 12) ? 'pm' : 'am';

          // Getting restaurant open and close hours
          const hours = data.restaurant.hours;
          const hoursArray = Object.values(hours).slice(0, 7);
          const weekdayHours = [];

          hoursArray.map(day => {
            let openAndClose = [];
            const open = parseInt(day.open.split(':')[0]);
            const close = parseInt(day.close.split(':')[0]);
            openAndClose.push(open, close);
            weekdayHours.push(openAndClose);
          });

          // Creating an array for weekday labels
          const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

          // Getting an array of amenities
          const amenities = data.restaurant.amenities;

          const amenitiesKeys = Object.keys(amenities).slice(0, Object.keys(amenities).length - 1);
          const amenitiesValues = Object.values(amenities).slice(0, Object.keys(amenities).length - 1);
          let amenitiesArray = [];
          let indx = 0;

          while (indx < amenitiesKeys.length) {
            let keyAndValue = [];
            let spacedKey = '';
            let spacedKeyArray = [];
            let capitalizedKeyArray = [];

            // Capitalizing spaced out key
            spacedKey = amenitiesKeys[indx].replace(/([a-z](?=[A-Z]))/g, '$1 ');
            spacedKeyArray = spacedKey.split(' ');
            spacedKeyArray.map(word => capitalizedKeyArray.push(word[0].toUpperCase() + word.slice(1)));

            keyAndValue.push(capitalizedKeyArray.join(' '), amenitiesValues[indx]);
            amenitiesArray.push(keyAndValue);
            indx++;
          };

          // Saving restaurant reviews to a variable for easier access
          const reviews = data.restaurant.reviews;

          // Getting average rating from all reviews
          let total = 0;
          let average;

          reviews.forEach(review => {
            total += review.rating;
          });

          average = total / reviews.length;

          // Determining star ratings indicator
          let stars;

          if (average === 0) {
            stars = 'zero';
          } else if (average > 0 && average <= 1) {
            stars = 'one'; 
          } else if (average > 1 && average < 1.6) {
            stars = 'one_and_half';
          } else if (average >= 1.6 && average <= 2) {
            stars = 'two';
          } else if (average > 2 && average < 2.6) {
            stars = 'two_and_half';
          } else if (average >= 2.6 && average <= 3) {
            stars = 'three';
          } else if (average > 3 && average < 3.6) {
            stars = 'three_and_half';
          } else if (average >= 3.6 && average <= 4) {
            stars = 'four';
          } else if (average > 4 && average < 4.6) {
            stars = 'four_and_half';
          } else {
            stars = 'five';
          }

          return (
            <div className="restaurant-detail-wrapper">
              <Navbar />

              <div className="photo-banner-wrapper">
                <p>Image 1</p>
                <p>Image 2</p>
                <p>Image 3</p>
                <p>Image 4</p>
              </div>

              <h1>{data.restaurant.name}</h1>

              <div className="ratings-and-reviews-wrapper">
                <div className="stars-icon-wrapper">
                  <img src={`/images/restaurant_detail/${stars}.png`} />
                </div>

                <p>{reviews.length} {reviews.length > 1 || reviews.length === 0 ? 'reviews' : 'review'}</p>
              </div>

              <div className="detail-price-and-category-wrapper">
                <p>{dollars}</p>
                <p>•</p>
                <p>{data.restaurant.category}</p>
              </div>

              <div className="menu-buttons-wrapper">
                <div className="review-button-wrapper">
                  <i className="star-icon"></i>
                  <p>Write a Review</p>
                </div>

                <div className="add-photo-button-wrapper">
                  <i className="camera-icon"></i>
                  <p>Add Photo</p>
                </div>

                <div className="save-button-wrapper">
                  <i className="bookmark-icon"></i>
                  <p>Save</p>
                </div>
              </div>

              <div className="popular-dishes-wrapper">
                <h3>Popular Dishes</h3>

                <div className="dish-1-wrapper">
                  <div className="dish-image-wrapper"></div>
                  <p>Dish #1</p>
                </div>

                <div className="dish-2-wrapper">
                  <div className="dish-image-wrapper"></div>
                  <p>Dish #2</p>
                </div>

                <div className="dish-3-wrapper">
                  <div className="dish-image-wrapper"></div>
                  <p>Dish #3</p>
                </div>
              </div>

              <div className="location-and-hours-wrapper">
                <h3>Location & Hours</h3>

                <div className="map-wrapper">
                  <div className="map-image-wrapper"></div>

                  <div className="map-text-info-wrapper">
                    <p>{data.restaurant.location.streetAddress}</p> 
                    <p>{data.restaurant.location.city}, {data.restaurant.location.state} {data.restaurant.location.zipCode}</p>
                  </div>
                </div>

                <div className="hours-wrapper">
                  {weekdayHours.map((weekday, indx) => {
                    // Conditionals for determining if a restaurant is open or closed based on time
                    const isOpen = (currentHour < weekday[0] && ampm === 'am') ||
                      (currentHour === weekday[0] && currentMinutes > 0 && ampm === 'am');
                    
                    const isClosed = (currentHour > weekday[1] && ampm === 'pm');

                    return (
                      <div className="weekday-wrapper" key={indx}>
                        <p>{weekdayLabels[indx]}</p>
                        <p>{hoursArray[indx].open} - {hoursArray[indx].close}</p>
                        <p>{((isOpen && currentDay === indx + 1) || (isClosed && currentDay === indx + 1)) ? 'Closed' : ''}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="amenities-wrapper">
                <h3>Amenities</h3>

                <div className="amenities-list-wrapper">
                  <ul>
                    {amenitiesArray.slice(0, 4).map((amenity, indx) => (
                      <li key={indx}>
                        <i className="amenity-icon"></i>
                        <p>{amenity[0]}</p>
                        <p>{amenity[1] ? 'Yes' : 'No'}</p>
                      </li>
                    ))}
                  </ul> 

                  {this.state.viewMoreAmenities ? 
                  <ul>
                    {amenitiesArray.slice(4, amenitiesArray.length).map((amenity, indx) => (
                        <li key={indx}>
                          <i className="amenity-icon"></i>
                          <p>{amenity[0]}</p>
                          <p>{amenity[1] ? 'Yes' : 'No'}</p>
                        </li>
                      ))
                    }
                  </ul> : ''}
                </div>

                <div 
                  className="view-more-amenities-wrapper"
                  onClick={this.toggleAmenities}
                >
                  {this.state.viewMoreAmenities ? 'Show Less' : `${amenitiesArray.length - 4} more attributes`}
                </div>
              </div>

              <div className="recommended-reviews-wrapper">
                <h3>Recommended Reviews</h3>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default RestaurantDetail;