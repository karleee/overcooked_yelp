import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import RestaurantMap from '../map/RestaurantMap';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/RestaurantDetail.css';

const { FETCH_RESTAURANT, FETCH_REVIEW, CURRENT_USER, FETCH_REVIEWS_OF_RESTAURANT } = Queries;


// RestaurantIndex component returning information about all restaurants from backend
// Scrolls automatically to top of the page
class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      currentTime: new Date(),
      viewMoreAmenities: false
    }
    this.toggleAmenities = this.toggleAmenities.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ currentTime: new Date() })
    }, 1000);
  }

  toggleAmenities() {
    this.setState({ viewMoreAmenities: !this.state.viewMoreAmenities });
  }

  renderReview(restaurantId, reviewData, userId, restaurantName) {
    if(userId) {
      if(reviewData.data.review) {
        this.props.history.push({pathname: `/restaurants/${restaurantId}/reviews/edit`, state: {review: reviewData.data.review, userId, restaurantName }});
      } else {
        this.props.history.push({pathname: `/restaurants/${restaurantId}/reviews/create`, state: {userId, restaurantName}});
      }
    } else {
      this.props.history.push('/login');
    }
  }

  renderAllReviews(reviews) {
    // console.log(reviews)
    return reviews.map(review => {
      let stars;
      if(review.rating === 1) { 
        stars = 'one';
      } else if(review.rating === 2) {
         stars = 'two';
      } else if(review.rating === 3) { 
        stars = 'three';
      } else if(review.rating === 4) { 
        stars = 'four';
      } else if(review.rating === 5){
        stars = 'five';
      }
      return (
        <li key={review._id} className='individual-review-info-container'>
          <div className='review-user-info-container'>
            <div className='review-user-profilephoto-container'>
              <img src={review.user.profilePhoto} />
            </div>
            <div className='review-user-info' >
              <div className='review-user-name'>

                <p>{review.user.firstName} {(review.user.lastName)[0]}.</p>
              </div>
              <div  className='review-user-friends'>
                <i class="fas fa-star"></i>
                <p>{review.user.friends} friends</p>
              </div>
              <div className='review-user-num-reviews'>
                <i class="fas fa-poll-h"></i>
                <p>{review.user.reviews.length} reviews </p>
              </div>
            </div>
          </div>
          <div className='review-info'>
            <div className='review-stars-icon-and-date'>
              <div className='stars-icon-wrapper'>
                  <img src={`/images/restaurant_detail/${stars}.png`} />
              </div>
              <p className='individual-review-date'>{review.date}</p>
            </div>
            <p className='individual-review-body'>{review.body}</p>
          </div>
        </li>
      )
    })
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
          const currentHour = this.state.currentTime.getHours();
          const currentMinutes = this.state.currentTime.getMinutes();
          const currentDay = this.state.currentTime.getDay();
          const ampm = (currentHour >= 12) ? 'pm' : 'am';
          let adjustedHour;

          // Adjusting time for 12 hour format
          if (currentHour > 12) {
            adjustedHour = currentHour - 12;
          } else {
            adjustedHour = currentHour;
          }

          // Getting restaurant open and close hours
          const hours = data.restaurant.hours;
          const hoursArray = Object.values(hours).slice(0, 7);
          const weekdayHours = [];

          hoursArray.map(day => {
            let openTime;
            let openAmPm;
            let closeTime;
            let closeAmPm;
            let open = [];
            let close = [];
            let openAndClose = [];

            openTime = parseInt(day.open.split(':')[0]);
            closeTime = parseInt(day.close.split(':')[0]);
            openAmPm = day.open.split(' ')[1];
            closeAmPm = day.close.split(' ')[1];

            open.push(openTime, openAmPm);
            close.push(closeTime, closeAmPm);

            openAndClose.push(open, close);
            weekdayHours.push(openAndClose);
          });

          // console.log(weekdayHours);

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

            <div className="restaurant-detail-banner-wrapper">
              <div className="restaurant-detail-photos-wrapper">
                {data.restaurant.photos.slice(0, 4).map((photo, indx) => (
                  <div key={photo._id} className="restaurant-detail-thumbnail-wrapper">
                    <img src={photo.url} alt="Restaurant photo" />
                  </div>
                ))}
              </div>

              <div className="restaurant-detail-gallery-button-wrapper">
                <Link to={`/restaurants/${data.restaurant._id}/photos`}>See All {data.restaurant.photos.length}</Link>
              </div>
            </div>

              <div className="restaurant-detail-main-content-wrapper">
                <div className="restaurant-detail-body-wrapper">
                  <div className="restaurant-detail-header-wrapper">
                    <h1>{data.restaurant.name}</h1>

                    <div className="restaurant-detail-claimed-wrapper">
                      <img src="/images/restaurant_detail/claimed.png" alt="Claimed icon image" />
                      <p>Claimed</p>
                    </div>
                  </div>

                  <div className="restaurant-detail-ratings-and-reviews-wrapper">
                    <div className="stars-icon-wrapper">
                      <img src={`/images/restaurant_detail/${stars}.png`} />
                    </div>
                    <p>{reviews.length} {reviews.length > 1 || reviews.length === 0 ? 'reviews' : 'review'}</p>
                  </div>

                  <div className="restaurant-detail-price-and-category-wrapper">
                    <p>{dollars}</p>
                    <p className="restaurant-detail-price-and-category-dot-wrapper">•</p>
                    <p>{data.restaurant.category}</p>
                  </div>

                  <div className="restaurant-detail-menu-buttons-wrapper">
                    <div className="restaurant-detail-review-button-wrapper">
                      <i className="restaurant-detail-star-icon"></i>
                      <Query query={CURRENT_USER} >
                        {(currentUser) => {
                          return (
                            <Query query={FETCH_REVIEW} variables={{restaurantId: this.props.match.params.id, userId: currentUser.data.currentUserId}} >
                              {(reviewData) => {
                                  return (
                                    <p><button onClick={() => this.renderReview(data.restaurant._id, reviewData, currentUser.data.currentUserId, data.restaurant.name)}>Write a Review</button></p>
                                  )
                              }}
                            </Query>
                          )
                        }}
                      </Query>
                    </div>

                    <div className="restaurant-detail-add-photo-button-wrapper">
                      <i className="restaurant-detail-camera-icon"></i>
                      <p>Add Photo</p>
                    </div>

                    <div className="restaurant-detail-save-button-wrapper">
                      <i className="restaurant-detail-bookmark-icon"></i>
                      <p>Save</p>
                    </div>
                  </div>

                  <div className="restaurant-detail-popular-dishes-wrapper">
                    <h3>Popular Dishes</h3>

                    <div className="restaurant-detail-dishes-wrapper">
                      {data.restaurant.popularDishes.map((dish, indx) => (
                        <div key={indx} className="dish-wrapper">
                          <div className="dish-image-wrapper">
                            <img src={dish.url} alt="Popular dish thumbnail image" />
                          </div>

                          <p>{dish.name}</p>
                        </div>
                      ))}

                      {/* <div className="restaurant-detail-dish-1-wrapper">
                        <div className="dish-image-wrapper"></div>
                        <p>Blueberry Pancakes</p>
                      </div>

                      <div className="restaurant-detail-dish-2-wrapper">
                        <div className="dish-image-wrapper"></div>
                        <p>Toasted S'mores</p>
                      </div> */}

                      {/* <div className="restaurant-detail-dish-3-wrapper">
                        <div className="dish-image-wrapper"></div>
                        <p>Campfire Breakfast</p>
                      </div> */}
                    </div>
                  </div>

                  <div className="restaurant-detail-location-and-hours-wrapper">
                    <h3>Location & Hours</h3>

                    <div className="restaurant-detail-location-and-hours-body-wrapper">
                      <div className="restaurant-detail-map-wrapper">
                        <div className="restaurant-detail-map-image-wrapper"> 
                          <RestaurantMap restaurants={[data.restaurant]} />
                        </div>

                        <div className="restaurant-detail-map-text-info-wrapper">
                          <p>{data.restaurant.location.streetAddress}</p> 
                          <p>{data.restaurant.location.city}, {data.restaurant.location.state} {data.restaurant.location.zipCode}</p>
                          <p>{data.restaurant.location.city}</p>
                        </div>
                      </div>

                      <div className="restaurant-detail-hours-wrapper">
                        <div className="restaurant-detail-weekday-wrapper">
                          {weekdayLabels.map(weekday => (
                            <p>{weekday}</p>
                          ))}
                        </div>

                        <div className="restaurant-detail-open-and-close-wrapper">
                          {weekdayHours.map((weekday, indx) => {
                            // Conditional for determining if a restaurant is open based on time                            
                            const isOpen = ((adjustedHour >= weekday[0][0] && ampm === 'am') || (adjustedHour < weekday[1][0] && ampm === 'pm')) ||
                              (adjustedHour === 12 && ampm === 'pm' && (weekday[0][0] === 12 && weekday[0][1] === 'pm') && (weekday[1][0] !== 12 && weekday[1][1] !== 'pm'));
                                                        
                            return (
                              <section>
                                <p>{hoursArray[indx].open} - {hoursArray[indx].close}</p>
                                <p className="restaurant-detail-closed-wrapper">{!isOpen && currentDay === indx + 1 ? 'Closed now' : ''}</p>
                                <p className="restaurant-detail-open-wrapper">{isOpen && currentDay === indx + 1 ? 'Open now' : ''}</p>
                              </section>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="restaurant-detail-amenities-wrapper">
                    <h3>Amenities</h3>

                    <div className="amenities-list-wrapper">
                      <ul>
                        {amenitiesArray.slice(0, 4).map((amenity, indx) => {
                          // Accounting for number value for health score amenity
                          let amenityValue;
                          if (amenity[0] === 'Health Score') {
                            amenityValue = amenity[1];
                          } else {
                            if (amenity[1]) {
                              amenityValue = 'Yes';
                            } else {
                              amenityValue = 'No';
                            }
                          }

                          return (
                            <li key={indx}>
                              <i className="amenity-icon"></i>
                              <p>{amenity[0]}</p>
                              <p>{amenityValue}</p>
                            </li>
                          );
                        })}
                      </ul> 

                      {this.state.viewMoreAmenities ? 
                      <ul>
                        {amenitiesArray.slice(4, amenitiesArray.length).map((amenity, indx) => {
                          // Accounting for number value for health score amenity
                          let amenityValue;
                          if (amenity[0] === 'Health Score') {
                            amenityValue = amenity[1];
                          } else {
                            if (amenity[1]) {
                              amenityValue = 'Yes';
                            } else {
                              amenityValue = 'No';
                            }
                          }

                          return (
                            <li key={indx}>
                              <i className="amenity-icon"></i>
                              <p>{amenity[0]}</p>
                              <p>{amenityValue}</p>
                            </li>
                          );
                        })}
                      </ul> : ''}
                    </div>

                    <div 
                      className="restaurant-detail-view-more-amenities-wrapper"
                      onClick={this.toggleAmenities}
                    >
                      {this.state.viewMoreAmenities ? 'Show Less' : `${amenitiesArray.length - 4} more attributes`}
                    </div>
                  </div>

                  <div className="restaurant-detail-recommended-reviews-wrapper">
                    <h3>Recommended Reviews</h3>
                    <ul className='reviews-display-list'>
                        {this.renderAllReviews(data.restaurant.reviews)}
                    </ul>
                  </div>
                </div>

                <div className="restaurant-detail-sidebar-wrapper">
                  <div className="restaurant-detail-phone-wrapper">
                    <i className="restaurant-detail-phone-icon"></i>
                    <p>{data.restaurant.phoneNum}</p>
                  </div>

                  <div className="sidebar-underline-wrapper"></div>

                  <div className="restaurant-detail-directions-wrapper">
                    <i className="restaurant-detail-directions-icon"></i>
                    <p>Get Directions</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default RestaurantDetail;