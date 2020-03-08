import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/Navbar.css';
import SessionButton from '../session/SessionButton';
import SearchForm from '../search/SearchForm';

// Navbar component returning information about all restaurants from backend
const Navbar = () => {
  return (
    <div className="navbar-container">
      {/* <div className="main-navbar-wrapper"> */}
        <div className="navbar-home-logo-wrapper">
          <Link to='/'>
            <p>morsel</p>
            <img src="/images/navbar/plain_logo.png" alt="Logo" /> 
          </Link>
        </div>

        {/* <div className="navbar-search-wrapper"> */} 
          <SearchForm mode="navbar" />
        {/* </div> */}

        <div className="navbar-links-wrapper">
          <div className="navbar-review-link-wrapper"> 
            <p>Write a Review</p>
          </div> 

          <div className="navbar-buttons-wrapper">
            <SessionButton />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Navbar;