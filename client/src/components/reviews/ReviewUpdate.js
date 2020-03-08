import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
import Queries from '../../graphql/queries';
import ReviewNavbar from './ReviewNavbar';
import { Link } from 'react-router-dom';

import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/ReviewCreateUpdate.css';


const { UPDATE_REVIEW } = Mutations;
const { FETCH_REVIEW } = Queries;

const reviewPlaceHolder = "Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong. Not much else to say besides go see for yourself! You won’t be disappointed."

class ReviewUpdate extends Component {
  constructor(props) {
      super(props);
      const review = this.props.location.state.review
      const userId = this.props.location.state.userId
      this.state = {
          _id: review._id,
          rating: review.rating || 0,
          body: review.body || '',
          restaurantId: this.props.match.params.id,
          userId,
          restaurantName: this.props.location.state.restaurantName
      }
      window.scrollTo(0,0);
  }

  handleSubmit(e, updateReview) {
      e.preventDefault();
      updateReview({
          variables: {
              _id: this.state._id,
              rating: this.state.rating,
              body: this.state.body,
              restaurantId: this.state.restaurantId,
              date: `${new Date().toLocaleDateString()}`
          }
      })
      .then(data => {
          this.props.history.push(`/restaurants/${this.state.restaurantId}`)
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
      //not dry, make dry
      if(this.state.rating === 0) {
          return (
              <div className='review-hearts'>
                <div>
                  <i className='far fa-star' onClick={this.updateRating(1)}></i>
                  <i className='far fa-star' onClick={this.updateRating(2)}></i>
                  <i className='far fa-star' onClick={this.updateRating(3)}></i>
                  <i className='far fa-star' onClick={this.updateRating(4)}></i>
                  <i className='far fa-star' onClick={this.updateRating(5)}></i>
                </div>
                  <p className='rating-message'>Select rating</p>
              </div>
          )
      } else if (this.state.rating === 1) {
          return (
              <div className='review-hearts'>
                <div>
                  <i className='fas fa-star' onClick={this.updateRating(1)}></i>
                  <i className='far fa-star' onClick={this.updateRating(2)}></i>
                  <i className='far fa-star' onClick={this.updateRating(3)}></i>
                  <i className='far fa-star' onClick={this.updateRating(4)}></i>
                  <i className='far fa-star' onClick={this.updateRating(5)}></i>
                </div>
                  <p className='rating-message'>Eek! Methinks not.</p>

              </div>
          )
      } else if (this.state.rating === 2) {
          return (
              <div className='review-hearts'>
                <div>
                  <i className='fas fa-star' onClick={this.updateRating(1)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(2)}></i>
                  <i className='far fa-star' onClick={this.updateRating(3)}></i>
                  <i className='far fa-star' onClick={this.updateRating(4)}></i>
                  <i className='far fa-star' onClick={this.updateRating(5)}></i>
                </div>
                  <p className='rating-message'>Meh, I've experience better.</p>
              </div>
          )
      } else if (this.state.rating === 3) {
          return (
              <div className='review-hearts'>
                <div>
                  <i className='fas fa-star' onClick={this.updateRating(1)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(2)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(3)}></i>
                  <i className='far fa-star' onClick={this.updateRating(4)}></i>
                  <i className='far fa-star' onClick={this.updateRating(5)}></i>
                </div>
                  <p className='rating-message'>A-OK.</p>
              </div>
          )
      } else if (this.state.rating === 4) {
          return (
              <div className='review-hearts'>
                <div>
                  <i className='fas fa-star' onClick={this.updateRating(1)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(2)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(3)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(4)}></i>
                  <i className='far fa-star' onClick={this.updateRating(5)}></i>
                </div>
                  <p className='rating-message'>Yay! I'm a fan.</p>
              </div>
          )
      } else if (this.state.rating === 5) {
          return (
              <div className='review-hearts'>
                <div>
                  <i className='fas fa-star' onClick={this.updateRating(1)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(2)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(3)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(4)}></i>
                  <i className='fas fa-star' onClick={this.updateRating(5)}></i>
                </div>
                  <p className='rating-message'>Woohoo! As good as it gets!</p>

              </div>
          )
      }
  }

  updateCache(cache, {data: {updateReview}} ) {
      let review;
      try {
          review = cache.readQuery({ query: FETCH_REVIEW , variables: {userId: this.state.userId, restaurantId: this.state.restaurantId}});
      } catch (err) {
          return;
      }
      if (review) {
          cache.writeQuery({
              query: FETCH_REVIEW,
              variables: {userId: this.state.userId, restaurantId: this.state.restaurantId},
              data: { review: updateReview }
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
        mutation={UPDATE_REVIEW}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(updateReview, { data }) => (
          <div className="review-edit-container">
            <ReviewNavbar mode="edit" />
            <div className="review-form-main">
              <div className="review-form-heading">
                <h1 className="restaurant-name">
                  <Link to={`/restaurants/${this.state.restaurantId}`}>
                    <h1>{this.state.restaurantName}</h1>
                  </Link>
                </h1>
                <span>
                  <Link to="#">Read our review guidelines</Link>
                </span>
              </div>

              <div className="review-form-wrapper">
                <form
                  className="review-form"
                  onSubmit={e => this.handleSubmit(e, updateReview)}
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
                  <div className="review-photos-form-wrapper">
                    <h3>Attach Photos <small>Optional</small></h3>
                    <div className="review-photos-upload-wrapper">
                      <div className="upload-icon">
                        <i className='fas fa-camera'></i>
                        <div>Upload</div>
                      </div>
                    </div>
                  </div>
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

export default ReviewUpdate;