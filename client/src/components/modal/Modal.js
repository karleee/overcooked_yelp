import React from 'react';
import '../../assets/stylesheets/Modal.css';

class Modal extends React.Component {
  // Constructor for Modal
  constructor(props) {
    super(props);
    this.state = { 
      currentPhoto: this.props.currentPhoto,
      allPhotos: this.props.allPhotos
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  // Handles image clicking
  handleClick(num) {
    this.setState({ currentPhoto: num });
  }

  // Goes to previous photo
  previous() {
    let newImage = ((this.state.currentPhoto - 1) + this.state.allPhotos.length) % this.state.allPhotos.length;
    this.setState({ currentPhoto: newImage });
  }

  // Goes to next photo
  next() {
    let newImage = (this.state.currentPhoto + 1) % this.state.allPhotos.length;
    this.setState({ currentPhoto: newImage });
  }

  // Renders component
  render() {
    const currentPhoto = this.state.allPhotos[this.state.currentPhoto];
    const date = currentPhoto.review.date;

    // Formatting numerical date into string format
    const dateArray = date.split('/');
    const month = dateArray[0];
    const day = dateArray[1];
    const yr = dateArray[2];
    let fullDate = '';

    const wordMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    fullDate = `${wordMonths[month]} ${day}, ${yr}`;
    
    return (
      <div className="modal-wrapper">  
        <div className="modal-background-wrapper" onClick={this.props.toggleModal}></div>

        <div className="modal-main-content-wrapper">    
          <div className="main-image-wrapper">
            <div className="previous-arrow-wrapper" onClick={this.previous}>
              <i className="previous-arrow-icon"></i>
            </div>

            <div className="selected-image-wrapper">
              <img src={currentPhoto.url} alt="Gallery photo" />
            </div>

            <div className="next-arrow-wrapper" onClick={this.next}>
              <i className="next-arrow-icon"></i>
            </div>
          </div>

          <div className="modal-sidebar-wrapper">
            <div className="modal-user-wrapper">
              <div className="modal-user-thumbnail-wrapper">
                <img src={currentPhoto.user.profilePhoto} alt="User profile picture thumbnail" />
              </div>

              <div className="modal-user-info-header">
                <h4>{currentPhoto.user.firstName} {currentPhoto.user.lastName}</h4>
                
                <div className="modal-user-badges-wrapper">
                  <div className="modal-user-friends-wrapper">
                    <img src="/images/gallery/friends_icon.png" alt="Friends icon image" />
                    <p>{currentPhoto.user.friends}</p>
                  </div>

                  <div className="modal-user-total-reviews-wrapper">
                    <img src="/images/gallery/total_reviews_icon.png" alt="Friends icon image" />
                    <p>{currentPhoto.user.reviews.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-photo-description-wrapper">
              <p>{currentPhoto.description}</p>
            </div>

            <div className="modal-photo-date-wrapper">
              <p>{fullDate}</p>
            </div>

            <div className="modal-was-this-photo-wrapper">
              <p>Was this photo...?</p>

              <div className="modal-helpful-not-helpful-wrapper">
                <div className="modal-helpful-button">
                  <p>Helpful</p>
                </div>

                <div className="modal-not-helpful-button">
                  <p>Not Helpful</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;