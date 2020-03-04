import React from 'react';
import '../../assets/stylesheets/Modal.css';

class Modal extends React.Component {
  // Constructor for Modal
  constructor(props) {
    super(props);
    this.state = { 
      currentImage: this.props.imageNum,
      allImages: this.props.restaurant.photos,
      showModal: true
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  // Hides scrolling when modal is mounted
  componentDidMount() {
    if (this.props.modal) document.body.style.overflow = 'hidden';
  }

  // Reactiviates scrolling when modal is unmounted
  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  // Handles image clicking
  handleClick(num) {
    this.setState({ currentImage: num });
  }

  // Goes to previous photo
  previous() {
    let newImage = ((this.state.currentImage - 1) + this.state.allImages.length) % this.props.allImages.length;
    this.setState({ currentImage: newImage });
  }

  // Goes to next photo
  next() {
    let newImage = (this.state.currentImage + 1) % this.props.allImages.length;
    this.setState({ currentImage: newImage });
  }

  // Renders component
  render() {
    return (
      <div className="modal-wrapper">  
        <div className="modal-background-wrapper" onClick={this.props.toggleModal}></div>

        <div className="modal-main-content-wrapper">    
          <div className="main-image-wrapper">
            <div className="previous-arrow-wrapper" onClick={this.previous}>
              <i className="previous-arrow"></i>
            </div>

            <div className="selected-image-wrapper">
              <img src={this.state.allImages[this.state.currentImage]} alt="Gallery photo" />
            </div>

            <div className="next-arrow-wrapper" onClick={this.next}>
              <i className="next-arrow"></i>
            </div>
          </div>

          <div className="modal-sidebar-wrapper">
            <p>Put user info here</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;