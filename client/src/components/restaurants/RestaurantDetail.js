import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Map from '../map/Map';
import { 
  setAmenityValue, 
  getAverageRating, 
  getStarImage, 
  getCapitalizedKey, 
  getPopularDishOccurences
} from '../../util/restaurant_util';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/RestaurantDetail.css';

const { FETCH_RESTAURANT, FETCH_REVIEW, CURRENT_USER } = Queries;


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
    if(reviewData.data.review) {
      this.props.history.push({pathname: `/restaurants/${restaurantId}/reviews/edit`, state: {review: reviewData.data.review, userId, restaurantName }})
    } else {
      this.props.history.push({pathname: `/restaurants/${restaurantId}/reviews/create`, state: {userId, restaurantName}})
    }
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

          // Creating an array for weekday labels
          const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

          // Getting an array of amenities
          const amenities = data.restaurant.amenities;
          const amenitiesRawKeys = Object.keys(amenities);

          // Put extra amenities into pairs
          const extraAmenitiesRawKeys = amenitiesRawKeys.slice(4, amenitiesRawKeys.length - 1);
          let pairedExtraAmenities = [];

          for (let i = 0; i < extraAmenitiesRawKeys.length; i += 2) {
            let pair = [];
            pair.push(extraAmenitiesRawKeys[i], extraAmenitiesRawKeys[i + 1]);
            pairedExtraAmenities.push(pair);
          }
          
          // Saving restaurant reviews and photos to a variable for easier access
          const reviews = data.restaurant.reviews;
          const photos = data.restaurant.photos;

          // Getting average rating from all reviews
          const average = getAverageRating(reviews);

          // Determining star ratings indicator
          const stars = getStarImage(average);
          
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
                      <img src={`/images/restaurant_detail/ratings/${stars}.png`} />
                    </div>
                    <p>{reviews.length} {reviews.length > 1 || reviews.length === 0 ? 'reviews' : 'review'}</p>
                  </div>

                  <div className="restaurant-detail-price-and-category-wrapper">
                    <p>{dollars}</p>
                    <p className="restaurant-detail-price-and-category-dot-wrapper">•</p>
                    <p>{data.restaurant.category}</p>
                  </div>

                  <div className="restaurant-detail-menu-buttons-container">
                    <div className="review-button-container">
                      <div className="review-button-wrapper">
                        <div className="review-button-icon-wrapper">
                          <img src="/images/restaurant_detail/action_menu/star_icon.png" alt="Write review icon image" />
                        </div>

                        <p>Write a Review</p>

                        {/* <Query query={CURRENT_USER} >
                          {currentUser => {
                            return (
                              <Query query={FETCH_REVIEW} variables={{ restaurantId: this.props.match.params.id, userId: currentUser.data.currentUserId }} >
                                {(reviewData) => {
                                  return (
                                    <p onClick={() => this.renderReview(data.restaurant._id, reviewData, currentUser.data.currentUserId, data.restaurant.name)}>Write a Review</p>
                                  )
                                }}
                              </Query>
                            )
                          }}
                        </Query> */}
                      </div>
                    </div>

                    <div className="photo-button-container">
                      <div className="photo-button-wrapper">
                        <div className="photo-button-icon-wrapper">
                          <img src="/images/restaurant_detail/action_menu/camera_icon.png" alt="Add photo icon image" />
                        </div>

                        <p>Add Photo</p>
                      </div>
                    </div>

                    <div className="save-button-container">
                      <div className="save-button-wrapper">
                        <div className="save-button-icon-wrapper">
                          <img src="/images/restaurant_detail/action_menu/bookmark_icon.png" alt="Bookmark icon image" />
                        </div>

                        <p>Save</p>
                      </div>
                    </div>
                  </div>

                  <div className="restaurant-detail-popular-dishes-container">
                    <h3>Popular Dishes</h3>

                    <div className="popular-dishes-wrapper">
                      {data.restaurant.popularDishes.map((dish, indx) => {
                        // Getting all reviews and photos associated with the popular dish
                        const foundReviews = getPopularDishOccurences(reviews, dish.name, 'reviews');
                        const foundPhotos = getPopularDishOccurences(photos, dish.name, 'photos');
                        
                        return (
                          <div key={indx} className="dish-wrapper">
                            <div className="dish-image-wrapper">
                              <img src={dish.url} alt="Popular dish thumbnail image" />
                            </div>

                            <div className="dish-text-wrapper">
                              <p>{dish.name}</p>

                              <div className="dish-reviews-and-photos-wrapper">
                                <p>{foundPhotos.length} {foundPhotos.length > 1 || foundPhotos.length === 0 ? 'Photos' : 'Photo'}</p>
                                <p>•</p>
                                <p>{foundReviews.length} {foundReviews.length > 1 || foundReviews.length === 0 ? 'Reviews' : 'Review'}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="restaurant-detail-location-and-hours-wrapper">
                    <h3>Location & Hours</h3>

                    <div className="restaurant-detail-location-and-hours-body-wrapper">
                      <div className="restaurant-detail-map-wrapper">
                        <div className="restaurant-detail-map-image-wrapper"> 
                          <Map restaurants={[data.restaurant]} />
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
                              (adjustedHour === 12 && ampm === 'pm');
                                                        
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

                    <div className="amenities-list-container">
                      <ul>
                        {amenitiesRawKeys.slice(0, 4).map((key, indx) => {
                          // Accounting for number value for health score amenity
                          const amenityValue = setAmenityValue(key, amenities[key]);

                          return (
                            <li key={indx}>
                              <div className={`${key}-icon-wrapper`}>
                                <img src={`/images/restaurant_detail/amenities/${key}_icon.png`} alt="Amenity icon image" />
                              </div>

                              <p>{getCapitalizedKey(key)}</p>
                              <p>{amenityValue}</p>
                            </li>
                          );
                        })}
                      </ul> 

                      {this.state.viewMoreAmenities ? 
                      <ul className="extra-amenities-container">
                        {pairedExtraAmenities.map((pair, indx) => {
                          // Setting first and second pair of amenity keys and values                          
                          const firstAmenityKey = pair[0];
                          const firstAmenityValue = setAmenityValue(firstAmenityKey, pair[1]);

                          const secondAmenityKey = pair[1];
                          const secondAmenityValue = setAmenityValue(secondAmenityKey, pair[1]);
                          
                          return (
                            <li key={indx}>
                              <div className="extra-amenity-pair-first">
                                <div className={`${pair[0]}-icon-wrapper`}>
                                  <img src={`/images/restaurant_detail/amenities/${firstAmenityKey}_icon.png`} alt="Amenity icon image" />
                                </div>

                                <p>{getCapitalizedKey(firstAmenityKey)}</p>
                                <p>{firstAmenityValue}</p>
                              </div>

                              <div className="extra-amenity-pair-second">
                                <div className={`${pair[1]}-icon-wrapper`}>
                                  <img src={`/images/restaurant_detail/amenities/${secondAmenityKey}_icon.png`} alt="Amenity icon image" />
                                </div>

                                <p>{getCapitalizedKey(secondAmenityKey)}</p>
                                <p>{secondAmenityValue}</p>
                              </div>
                            </li>
                          );

                        })}
                      </ul> : ''}
                    </div>

                    <div 
                      className="restaurant-detail-view-more-amenities-wrapper"
                      onClick={this.toggleAmenities}
                    >
                      {this.state.viewMoreAmenities ? 'Show Less' : `${extraAmenitiesRawKeys.length} more attributes`}
                    </div>
                  </div>

                  <div className="restaurant-detail-recommended-reviews-wrapper">
                    <h3>Recommended Reviews</h3>
                  </div>
                </div>

                <div className="restaurant-detail-sidebar-wrapper">
                  <div className="restaurant-detail-phone-wrapper">
                    <div className="restaurant-detail-phone-icon">
                      <img src="/images/restaurant_detail/sidebar/phoneNum_icon.png" alt="Phone number icon" />
                    </div>

                    <p>{data.restaurant.phoneNum}</p>
                  </div>

                  <div className="sidebar-underline-wrapper"></div>

                  <div className="restaurant-detail-directions-wrapper">
                    <div className="restaurant-detail-directions-icon">
                      <img src="/images/restaurant_detail/sidebar/directions_icon.png" alt="Phone number icon" />
                    </div>

                    <Link to={`/restaurants/${data.restaurant._id}/map`}>Get Directions</Link> 
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