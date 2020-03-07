import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/Navbar.css';
import SessionButton from '../session/SessionButton';

// Navbar component returning information about all restaurants from backend
const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="main-navbar-wrapper">
        <div className="navbar-home-logo-wrapper">
          <Link to='/'>
            <p>morsel</p>
            <img src="/images/navbar/plain_logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="navbar-search-input-wrapper">
          <input 
            type="text"
            placeholder="tacos, cheap dinner, Max's"
          />

          <div className="navbar-search-separator-wrapper"></div>

          <input
            type="text"
            placeholder="Put user's entered location here"
          />

          <div className="navbar-search-icon-wrapper">
            <i className="navbar-search-icon"></i>
          </div>
        </div>

        <div className="navbar-links-wrapper">
          <div className="navbar-review-link-wrapper">
            <p>Write a Review</p>
          </div> 

          <SessionButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;