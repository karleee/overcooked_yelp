import React, { Component } from 'react';
import { Query } from 'react-apollo';

import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Map from '../map/Map';
import ProgressLoader from '../loader/ProgressLoader';
import { 
  setAmenityValue, 
  getAverageRating, 
  getStarImage, 
  getCapitalizedKey, 
  getPopularDishOccurences,
  getDollarSigns
} from '../../util/restaurant_util';
import Footer from '../footer/Footer';

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

  // Runs once component is mounted
  // Continuously updaitng current time
  componentDidMount() {
    setInterval(() => {
      this.setState({ currentTime: new Date() })
    }, 1000);
  }

  // Toggles amenities viewing state
  toggleAmenities() {
    this.setState({ viewMoreAmenities: !this.state.viewMoreAmenities });
  } 

  // Takes a user to create a new review or edit their existing one
  renderReview(restaurantId, reviewData, userId) {
    if(userId) {
      if(reviewData.data.review) {
        this.props.history.push(`/restaurants/${restaurantId}/reviews/edit`);
      } else {
        this.props.history.push(`/restaurants/${restaurantId}/reviews/create`);
      }
    } else {
      this.props.history.push('/login');
    }
  }

  // Ordering reviews by date with most recent on top
  orderReviews(reviews) {    
    const reviewsCopy = reviews.slice();

    reviewsCopy.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date)
    })
    
    return reviewsCopy.reverse();
  }

  // Rendering photos component of a review
  renderPhotos(photos) {
    return (
      <div className="review-photos-container">
        <img src="/images/restaurant_detail/action_menu/camera_icon.png" alt="Camera" />

        <p>{photos} {photos > 1 ? 'photos' : 'photo'}</p>
      </div>
    );
  }

  // Rendering all reviews on a restaurant
  renderAllReviews(reviews) {
    return reviews.map(review => {
      const date = review.date.split('-');
      const yr = date[0];
      const month = date[1];
      const dat = date[2];
      const stars = getStarImage(review.rating);
      const photos = review.photos.length;

      return (
        <li key={review._id} className="review-container"> 
          <div className="user-info-container">
            <div className="profile-photo-container">
              <img src={review.user.profilePhoto} alt="Profile thumbnail" />
            </div>

            <div className="stats-container">
              <div className="stats-user-name-container">
                <p>{review.user.firstName} {(review.user.lastName)[0]}.</p>
              </div>

              <div  className="stats-friends-container">
                <div className="friends-icon-container">
                  <img src="/images/gallery/friends_icon.png" alt="Friends icon" />
                </div>

                <p>{review.user.friends}</p>
                <p>{review.user.friends > 1 || review.user.friends === 0 ? 'friends' : 'friend'}</p>
              </div>

              <div className="stats-num-reviews-container">
                <div className="num-reviews-icon-container">
                  <img src="/images/gallery/total_reviews_icon.png" alt="Reviews icon" />
                </div>

                <p>{review.user.reviews.length}</p>
                <p>{review.user.reviews.length > 1 || review.user.reviews.length === 0 ? 'reviews' : 'review'}</p>
              </div>

              <div className="stats-num-photos-container">
                <div className="num-photos-icon-container">
                  <img src="/images/gallery/camera_icon.png" alt="Camera icon" />
                </div>

                <p>{review.user.photos.length}</p>
                <p>{review.user.photos.length > 1 || review.user.photos.length === 0 ? 'photos' : 'photo'}</p>
              </div>
            </div>
          </div>

          <div className="user-review-container">
            <div className="stars-icon-and-date-container">
              <div className="stars-icon-wrapper">
                <img src={`/images/restaurant_detail/ratings/${stars}.png`} alt="Ratings icon" />
              </div>

              <p>{`${month}/${dat}/${yr}`}</p>
            </div>

            {photos > 0 ? this.renderPhotos(photos) : ''}

            <div className="body-container">
              <p>{review.body}</p>
            </div>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <Query query={FETCH_RESTAURANT} variables={{ _id: this.props.match.params.id }}> 
        {({ loading, error, data }) => {
          if (loading) return <ProgressLoader type='loading'/>;
          if (error) return <ProgressLoader type='error' />;

          // Linking for search results page
          const LinkToLocalCategory = ({ searchTerm, children }) => {
            let find_desc = encodeURI(searchTerm);
            return (
              <Query query={CURRENT_USER}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>
                  if (error) return <p>{error.message}</p>
                  let find_loc;

                  if (data.currentUserId) {
                    find_loc = data.currentUserZipCode;
                  } else {
                    find_loc = 'San Francisco, CA';
                  }

                  return (
                    <Link to={`/search?find_desc=${find_desc}&find_loc=${find_loc}`}>{children}</Link>
                  );
                }}
              </Query>
            );
          };

          // Converting price into dollar sign equivalents
          const dollars = getDollarSigns(data.restaurant.price);

          // Getting current time
          const currentHour = this.state.currentTime.getHours();
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

          // Getting different categories
          const categories = data.restaurant.category;
          const categoriesArr = categories.split(',');
          
          return (
            <div className="restaurant-detail body-container">
              <Navbar /> 

              <div className="restaurant-detail banner-container">
                <div className="restaurant-detail photos-container">
                  {data.restaurant.photos.slice(0, 4).map((photo, indx) => (
                    <div key={photo._id} className="restaurant-detail thumbnail-wrapper">
                      <img src={photo.url} alt="Restaurant thumbnail" />
                    </div>
                  ))}
                </div>

                <Link to={`/restaurants/${data.restaurant._id}/photos`}>See All {data.restaurant.photos.length}</Link>
              </div>

              <div className="restaurant-detail text-wrapper">
                <div className="restaurant-detail main-info-wrapper">
                  <div className="restaurant-detail header-wrapper">
                    <h1>{data.restaurant.name}</h1>

                    <div className="restaurant-detail claimed-wrapper">
                      <img src="/images/restaurant_detail/claimed.png" alt="Claimed icon" />
                      <p>Claimed</p>
                    </div>
                  </div>

                  <div className="restaurant-detail ratings-and-reviews-wrapper">
                    <img src={`/images/restaurant_detail/ratings/${stars}.png`} alt="Ratings icon" />
                    <p>{reviews.length} {reviews.length > 1 || reviews.length === 0 ? 'reviews' : 'review'}</p>
                  </div>

                  <div className="restaurant-detail price-category-wrapper">
                    <p>{dollars}</p>
                    <p className="restaurant-detail dot-wrapper">•</p>
                    {categoriesArr.map((cat, indx) => {
                      if (indx !== categoriesArr.length - 1) {
                        return <LinkToLocalCategory searchTerm={`${cat}`}>{cat},</LinkToLocalCategory>;
                      } else {
                        return <LinkToLocalCategory searchTerm={`${cat}`}>{cat}</LinkToLocalCategory>;
                      }
                    })}
                  </div>

                  <div className="restaurant-detail-menu-buttons-container">
                    <div className="review-button-container">
                      <Query query={CURRENT_USER} >
                        {currentUser => {
                          return (
                            <Query query={FETCH_REVIEW} variables={{ restaurantId: this.props.match.params.id, userId: currentUser.data.currentUserId }} >
                              {(reviewData) => {
                                return (
                                  <div className="review-button-wrapper" onClick={() => this.renderReview(data.restaurant._id, reviewData, currentUser.data.currentUserId, data.restaurant.name)}>
                                    <div className="review-button-icon-wrapper">
                                      <img src="/images/restaurant_detail/action_menu/star_icon.png" alt="Star icon" />
                                    </div>

                                    <p>Write a Review</p>
                                  </div>
                                );
                              }}
                            </Query>
                          );
                        }}
                      </Query>
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
                              <img src={dish.url} alt="Popular dish thumbnail" />
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
                              (adjustedHour === 12 && ampm === 'pm' && weekday[0][0] <= 12);
                            

                            // Adjusted currentDay index to account for Sunday (index 0 vs index 6 in the open/close hours array)
                            let newCurrentDayIndx;

                            if (currentDay === 0) {
                              newCurrentDayIndx = 6;
                            } else if (currentDay === 1) {
                              newCurrentDayIndx = 0;
                            } else {
                              newCurrentDayIndx = currentDay - 1;
                            }

                            return (
                              <section>
                                <p>{hoursArray[indx].open} - {hoursArray[indx].close}</p>
                                <p className="restaurant-detail-closed-wrapper">{!isOpen && indx === newCurrentDayIndx ? 'Closed now' : ''}</p>
                                <p className="restaurant-detail-open-wrapper">{isOpen && indx === newCurrentDayIndx ? 'Open now' : ''}</p>
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
                      <ul className="thumb-amenities-wrapper">
                        {amenitiesRawKeys.slice(0, 4).map((key, indx) => {
                          // Accounting for number value for health score amenity
                          const amenityValue = setAmenityValue(key, amenities[key]);

                          return (
                            <li key={indx}>
                              <div className={`${key}-icon-wrapper`}>
                                <img src={`/images/restaurant_detail/amenities/${key}_icon.png`} alt="Amenity icon" />
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
                                  <img src={`/images/restaurant_detail/amenities/${firstAmenityKey}_icon.png`} alt="Amenity icon" />
                                </div>

                                <p>{getCapitalizedKey(firstAmenityKey)}</p>
                                <p>{firstAmenityValue}</p>
                              </div>

                              <div className="extra-amenity-pair-second">
                                <div className={`${pair[1]}-icon-wrapper`}>
                                  <img src={`/images/restaurant_detail/amenities/${secondAmenityKey}_icon.png`} alt="Amenity icon" />
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
                    <ul className='reviews-display-list'>
                      {this.renderAllReviews(this.orderReviews(data.restaurant.reviews))}
                    </ul>
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

              <Footer />
            </div>
          );
        }}
      </Query>
    );
  }
};

export default RestaurantDetail;