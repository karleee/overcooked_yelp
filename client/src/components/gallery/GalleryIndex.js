import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries';
import Navbar from '../navbar/Navbar';
import Modal from '../modal/Modal';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/GalleryIndex.css';

const { FETCH_RESTAURANT } = Queries; 

// GalleryIndex component returning photo gallery of images from one restaurant from backend
class GalleryIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showModal: false,
      currentImage: 0 
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  // Toggles the gallery modal on and off
  toggleModal(indx) {
    this.setState({ 
      showModal: !this.state.showModal,
      currentImage: indx
    });
  }
  
  // Renders the component
  render() {
    return (
      <Query query={FETCH_RESTAURANT} variables={{ _id: this.props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

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
          // console.log(this.state.showModal);

          return (
            <div className="restaurant-photo-gallery-wrapper">      
              <Navbar />

              <div className="restaurant-photo-gallery-main-content-wrapper">
                <div className="main-content-wrapper">
                  <h1>Photos for {data.restaurant.name}</h1>

                  <div className="photo-gallery-header">
                    <div className="photo-gallery-thumbnail-wrapper">
                      <img src={data.restaurant.photos[0]} alt="Restaurant thumbnail image" />
                    </div>

                    <div className="photo-gallery-text-wrapper">
                      <Link to={`/restaurants/${data.restaurant._id}`}>{data.restaurant.name}</Link>

                      <div className="photo-gallery-stars-icon-wrapper">
                        <img src={`/images/restaurant_detail/${stars}.png`} />
                      </div>
                    </div>

                    <div className="photo-gallery-reviews-wrapper">
                      <p>{reviews.length} {reviews.length > 1 || reviews.length === 0 ? 'reviews' : 'review'}</p>
                    </div>
                  </div>

                  <div className="photo-gallery-filter-options-wrapper">
                    <div className="photo-gallery-filter-links-wrapper">
                      <p>All</p>
                      <p>Food</p>
                      <p>Inside</p>
                      <p>Drink</p>
                      <p>Menu</p>
                      <p>Outside</p>
                    </div>
                    
                    <div className="photo-gallery-underline-wrapper"></div>
                  </div>

                  <div className="photo-gallery-main-gallery-wrapper">
                    {data.restaurant.photos.map((photo, indx) => 
                      <div key={indx} className="gallery-thumbnail-photo-wrapper" onClick={() => this.toggleModal(indx)}>
                        <img src={photo} alt="Restaurant photo thumbnail" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="photo-gallery-modal-wrapper" onClick={this.toggleModal}>
                {this.state.showModal ? <Modal restaurant={data.restaurant} imageNum={this.state.currentImage} /> : ''}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default GalleryIndex;