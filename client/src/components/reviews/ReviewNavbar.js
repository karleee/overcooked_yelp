import React from 'react';
import { Link } from 'react-router-dom';

const ReviewNavbar = ({ mode }) => {
  let formTitle = mode === "create" ? "Write a Review" : "Edit Your Review";
  return (
    <div className="review-navbar">
      <div className="navbar-home-logo-wrapper">
        <Link to="/">
          <p>morsel</p>
          <img src="/images/navbar/plain_logo.png" alt="Logo" />
        </Link>
      </div>
      <div>
        <h2>{formTitle}</h2>
      </div>
    </div>
  );
}

export default ReviewNavbar;