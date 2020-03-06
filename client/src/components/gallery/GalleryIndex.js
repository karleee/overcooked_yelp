import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries';
import Navbar from '../navbar/Navbar';
import Modal from '../modal/Modal';
import { getAverageRating, getStarImage } from '../../util/restaurant_util';
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
      currentImage: 0,
      photos: [],
      viewingTab: 'viewAll'
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePhotos = this.togglePhotos.bind(this);
  }

  // Hides scrolling when modal is mounted
  componentDidMount() {
    if (this.state.showModal) document.body.style.overflow = 'hidden';
  }

  // Reactiviates scrolling when modal is unmounted
  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  // Toggles the gallery modal on and off
  toggleModal(indx) {
    this.setState({ 
      showModal: !this.state.showModal,
      currentImage: indx
    });
  }

  // Toggles which set of photos user is currently viewing
  togglePhotos(photos, type) {
    this.setState({ viewingTab: type });
    this.setState({ photos });
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
          const average = getAverageRating(reviews);

          // Determining star ratings indicator
          const stars = getStarImage(average);

          // Finding all, food, inside, drink, menu, and outside photos
          const allPhotos = data.restaurant.photos;
          let foodPhotos = [];
          let insidePhotos = [];
          let drinkPhotos = [];
          let menuPhotos = [];
          let outsidePhotos = [];

          allPhotos.forEach(photo => {
            photo.categories.forEach(category => {
              if (category === 'food') {
                foodPhotos.push(photo);
              }
              
              if (category === 'inside') {
                insidePhotos.push(photo);
              }

              if (category === 'drink') {
                drinkPhotos.push(photo);
              }

              if (category === 'menu') {
                menuPhotos.push(photo);
              }

              if (category === 'outside') {
                outsidePhotos.push(photo);
              }
            });
          });

          // console.log(data.restaurant);

          return (
            <div className="restaurant-photo-gallery-wrapper">      
              <Navbar />

              <div className="restaurant-photo-gallery-main-content-wrapper">
                <div className="main-content-wrapper">
                  <h1>Photos for {data.restaurant.name}</h1>

                  <div className="photo-gallery-header">
                    <div className="photo-gallery-thumbnail-wrapper">
                      <img src={data.restaurant.photos[0].url} alt="Restaurant thumbnail image" />
                    </div>

                    <div className="photo-gallery-text-wrapper">
                      <Link to={`/restaurants/${data.restaurant._id}`}>{data.restaurant.name}</Link>

                      <div className="photo-gallery-stars-icon-wrapper">
                        <img src={`/images/restaurant_detail/ratings/${stars}.png`} />
                      </div>
                    </div>

                    <div className="photo-gallery-reviews-wrapper">
                      <p>{reviews.length} {reviews.length > 1 || reviews.length === 0 ? 'reviews' : 'review'}</p>
                    </div>
                  </div>

                  <div className="photo-gallery-filter-options-wrapper">
                    <div className="photo-gallery-filter-links-wrapper">
                      <p onClick={() => this.togglePhotos(allPhotos, 'viewAll')} className={this.state.viewingTab === 'viewAll' ? 'active-filter-link' : ''}>All ({allPhotos.length})</p>
                      <p onClick={() => this.togglePhotos(foodPhotos, 'viewFood')} className={this.state.viewingTab === 'viewFood' ? 'active-filter-link' : ''}>Food ({foodPhotos.length})</p>
                      <p onClick={() => this.togglePhotos(insidePhotos, 'viewInside')} className={this.state.viewingTab === 'viewInside' ? 'active-filter-link' : ''}>Inside ({insidePhotos.length})</p>
                      <p onClick={() => this.togglePhotos(drinkPhotos, 'viewDrink')} className={this.state.viewingTab === 'viewDrink' ? 'active-filter-link' : ''}>Drink ({drinkPhotos.length})</p>
                      <p onClick={() => this.togglePhotos(menuPhotos, 'viewMenu')} className={this.state.viewingTab === 'viewMenu' ? 'active-filter-link' : ''}>Menu ({menuPhotos.length})</p>
                      <p onClick={() => this.togglePhotos(outsidePhotos, 'viewOutside')} className={this.state.viewingTab === 'viewOutside' ? 'active-filter-link' : ''}>Outside ({outsidePhotos.length})</p>
                    </div>
                    
                    <div className="photo-gallery-underline-wrapper"></div>
                  </div>

                  <div className="photo-gallery-main-gallery-wrapper">
                    {this.state.photos.length === 0 && this.state.viewingTab === 'viewAll' ? 
                      allPhotos.map((photo, indx) =>
                        <div key={indx} className="gallery-thumbnail-photo-wrapper" onClick={() => this.toggleModal(indx)}>
                          <img src={photo.url} alt="Restaurant photo thumbnail" />
                        </div>
                      ) : 
                      this.state.photos.map((photo, indx) => 
                        <div key={indx} className="gallery-thumbnail-photo-wrapper" onClick={() => this.toggleModal(indx)}>
                          <img src={photo.url} alt="Restaurant photo thumbnail" />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              <div className="photo-gallery-modal-wrapper">
                {this.state.showModal ? <Modal allPhotos={data.restaurant.photos} currentPhoto={this.state.currentImage} toggleModal={this.toggleModal} /> : ''}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default GalleryIndex;