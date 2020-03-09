import React from 'react';
import { Link } from 'react-router-dom';

const ReviewNavbar = ({ mode }) => {
  let formTitle = mode === "create" ? "Write a Review" : "Edit Your Review";
  return (
    <div className="review-form-navbar-container">
      <div className="review-form-header"> 
        <Link to="/">
          <div className="review-form-logo-wrapper">
            <svg>
              <text x="50%" y="50%">morsel</text>
            </svg>

            <img src="/images/homepage/logo.png" alt="Logo" />
          </div>
        </Link>
      </div>

      <h2>{formTitle}</h2>
    </div>
  );
}

export default ReviewNavbar;