import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Mutations from '../../graphql/mutations';
import Queries from '../../graphql/queries';
import ReviewNavbar from "./ReviewNavbar";
import { Link } from "react-router-dom";
import ProgressLoader from '../loader/ProgressLoader';

import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/ReviewCreateUpdate.css';


const { NEW_REVIEW } = Mutations;
const { FETCH_REVIEW, FETCH_RESTAURANT, CURRENT_USER } = Queries;

const reviewPlaceHolder = "Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong. Not much else to say besides go see for yourself! You won’t be disappointed."

class ReviewCreateContainer extends Component {
  constructor(props) {
      super(props)
  }
  
  render() {
      return (
        <Query query={CURRENT_USER} >
          {(currentUser) => {
            if (currentUser.loading) return <ProgressLoader type='loading'/>;
            if (currentUser.error) return <ProgressLoader type='error' />;
            return (
              <Query query={FETCH_RESTAURANT} variables={{ _id: this.props.match.params.id }} >
              {( restaurantData ) => {
                if (restaurantData.loading) return <ProgressLoader type='loading'/>;
                if (restaurantData.error) return <ProgressLoader type='error' />;
                return (
                  <ReviewCreate {...this.props} restaurant= {restaurantData.data.restaurant} userId={currentUser.data.currentUserId}/>
                )
              }}
            </Query>
            )
          }}
        </Query>
      )
  }
}


class ReviewCreate extends Component {
  constructor(props) {
      super(props);
      this.state = {
          rating: 0,
          body: '',
      }
      window.scrollTo(0, 0);
  }

  handleSubmit(e, newReview) {
      e.preventDefault();
      newReview({
          variables: {
              rating: this.state.rating,
              body: this.state.body,
              restaurantId: this.props.match.params.id,
          }
      })
      .then(() => {
        this.props.history.push(`/restaurants/${this.props.match.params.id}`)
    })
  }

  updateRating(rating) {
      return e=> {
          this.setState({ rating: rating })
      }
  }
  updateBody() {
      return e=> {
          this.setState({ body: e.target.value })
      }
  }
  
  renderHearts() {
    if(this.state.rating === 0) {
        return (
            <div className='review-hearts'>
                <div className='single-star' onClick={this.updateRating(1)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(2)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(3)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(4)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(5)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <p className='rating-message'>Select rating</p>
            </div>
        )
    } else if (this.state.rating === 1) {
        return (
            <div className='review-hearts'>
                <div className='single-star' onClick={this.updateRating(1)}><img src="/images/restaurant_detail/ratings/singles/solid_one_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(2)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(3)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(4)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(5)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <p className='rating-message'>Eek! Methinks not.</p>
            </div>
        )
    } else if (this.state.rating === 2) {
        return (
            <div className='review-hearts'>
                <div className='single-star' onClick={this.updateRating(1)}><img src="/images/restaurant_detail/ratings/singles/solid_two_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(2)}><img src="/images/restaurant_detail/ratings/singles/solid_two_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(3)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(4)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(5)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <p className='rating-message'>Meh, I've experience better.</p>
            </div>
        )
    } else if (this.state.rating === 3) {
        return (
            <div className='review-hearts'>
                <div className='single-star' onClick={this.updateRating(1)}><img src="/images/restaurant_detail/ratings/singles/solid_three_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(2)}><img src="/images/restaurant_detail/ratings/singles/solid_three_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(3)}><img src="/images/restaurant_detail/ratings/singles/solid_three_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(4)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(5)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <p className='rating-message'>A-OK.</p>
            </div>
        )
    } else if (this.state.rating === 4) {
        return (
            <div className='review-hearts'>
                <div className='single-star' onClick={this.updateRating(1)}><img src="/images/restaurant_detail/ratings/singles/solid_four_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(2)}><img src="/images/restaurant_detail/ratings/singles/solid_four_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(3)}><img src="/images/restaurant_detail/ratings/singles/solid_four_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(4)}><img src="/images/restaurant_detail/ratings/singles/solid_four_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(5)}><img src="/images/restaurant_detail/ratings/singles/empty_star.png" /></div>
                <p className='rating-message'>Yay! I'm a fan.</p>
            </div>
        )
    } else if (this.state.rating === 5) {
        return (
            <div className='review-hearts'>
                <div className='single-star' onClick={this.updateRating(1)}><img src="/images/restaurant_detail/ratings/singles/solid_five_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(2)}><img src="/images/restaurant_detail/ratings/singles/solid_five_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(3)}><img src="/images/restaurant_detail/ratings/singles/solid_five_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(4)}><img src="/images/restaurant_detail/ratings/singles/solid_five_star.png" /></div>
                <div className='single-star' onClick={this.updateRating(5)}><img src="/images/restaurant_detail/ratings/singles/solid_five_star.png" /></div>
                <p className='rating-message'>Woohoo! As good as it gets!</p>
            </div>
        )
    }
}

  updateCache(cache, {data: {newReview}} ) {
    let review;
    try {
        review = cache.readQuery({ query: FETCH_REVIEW , variables: {userId: this.props.userId, restaurantId: this.props.match.params.id}});
    } catch (err) {
        return;
    }
    if (review) {
        cache.writeQuery({
            query: FETCH_REVIEW,
            variables: {userId: this.props.userId, restaurantId: this.props.match.params.id},
            data: { review: newReview }
        });
    }
		let restaurant;
		try {
			restaurant = cache.readQuery({ query: FETCH_RESTAURANT, variables: {_id: this.props.match.params.id} }).restaurant
		} catch (err) {
			return;
		}
		if (restaurant) {
			restaurant.reviews.push(newReview);
			console.log(restaurant);
			cache.writeQuery({
				query: FETCH_RESTAURANT,
				variables: {_id: this.props.match.params.id},
				data: { restaurant: restaurant }
			});
		}	
}

  updateState(review) {
    return () => this.setState({
      rating: review.rating,
      body: review.body,
    })
  }

  render() {
    return (
      <Mutation
        mutation={NEW_REVIEW}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newReview, { data }) => (
          <div className="review-edit-container">
            <ReviewNavbar mode="create" />
            
            <div className="review-form-main">
              <div className="review-form-heading">
                <h1 className="restaurant-name">
                  <Link to={`/restaurants/${this.props.match.params.id}`}>
                    <h1>{this.props.restaurant.name}</h1>
                  </Link>
                </h1>
                <span>
                  <Link to="#">Read our review guidelines</Link>
                </span>
              </div>

              <div className="review-form-wrapper">
                <form
                  className="review-form"
                  onSubmit={e => this.handleSubmit(e, newReview)}
                >
                  <div className="review-form-editor-wrapper">
                    <div className="review-form-rating-wrapper">
                      {this.renderHearts()}
                    </div>
                    <textarea
                      onChange={this.updateBody()}
                      value={this.state.body}
                      placeholder={reviewPlaceHolder}
                      className="review-body-edit"
                    />
                  </div>

                  {/* <div className="review-photos-form-wrapper">
                    <h3>
                      Attach Photos <small>Optional</small>
                    </h3>
                    <div className="review-photos-upload-wrapper">
                      <div className="upload-icon">
                        <i className="fas fa-camera"></i>
                        <div>Upload</div>
                      </div>
                    </div>
                  </div> */}
                  <button
                    id="submit-review"
                    className="submit-review-button"
                    type="submit"
                  >
                    Post Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default ReviewCreateContainer;