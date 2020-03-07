import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
import Queries from '../../graphql/queries';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/ReviewCreateUpdate.css';


const { UPDATE_REVIEW } = Mutations;
const { FETCH_REVIEW } = Queries;

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
              <div className='edit-review-hearts'>
                  <i className='far fa-heart' onClick={this.updateRating(1)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(2)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(3)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(4)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(5)}></i>
                  <p className='rating-message'>Select rating</p>
              </div>
          )
      } else if (this.state.rating === 1) {
          return (
              <div className='edit-review-hearts'>
                  <i className='fas fa-heart' onClick={this.updateRating(1)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(2)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(3)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(4)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(5)}></i>
                  <p className='rating-message'>Eek! Methinks not.</p>

              </div>
          )
      } else if (this.state.rating === 2) {
          return (
              <div className='edit-review-hearts'>
                  <i className='fas fa-heart' onClick={this.updateRating(1)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(2)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(3)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(4)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(5)}></i>
                  <p className='rating-message'>Meh, I've experience better.</p>
              </div>
          )
      } else if (this.state.rating === 3) {
          return (
              <div className='edit-review-hearts'>
                  <i className='fas fa-heart' onClick={this.updateRating(1)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(2)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(3)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(4)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(5)}></i>
                  <p className='rating-message'>A-OK.</p>
              </div>
          )
      } else if (this.state.rating === 4) {
          return (
              <div className='edit-review-hearts'>
                  <i className='fas fa-heart' onClick={this.updateRating(1)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(2)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(3)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(4)}></i>
                  <i className='far fa-heart' onClick={this.updateRating(5)}></i>
                  <p className='rating-message'>Yay! I'm a fan.</p>
              </div>
          )
      } else if (this.state.rating === 5) {
          return (
              <div className='edit-review-hearts'>
                  <i className='fas fa-heart' onClick={this.updateRating(1)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(2)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(3)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(4)}></i>
                  <i className='fas fa-heart' onClick={this.updateRating(5)}></i>
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
        {(updateReview, {data}) => (
          <div className='review-edit-container'>
            <h1 className='restaurant-name-heading' >{this.state.restaurantName}</h1>
            {this.renderHearts()}
            <form onSubmit={e=> this.handleSubmit(e, updateReview)}>
              <textarea
                onChange={this.updateBody()} 
                value={this.state.body}                               
                placeholder='Body of Review'
                className='review-body-edit'
              />
              <button 
                id='submit-review' 
                className='submit-review-button' 
                type='submit'>Publish Review
              </button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

export default ReviewUpdate;