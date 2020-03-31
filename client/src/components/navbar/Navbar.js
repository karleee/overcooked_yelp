import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/Navbar.css';
import SessionButton from '../session/SessionButton';
import SearchForm from '../search/SearchForm';

// Navbar component returning information about all restaurants from backend
const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-home-logo-wrapper">
        <Link to='/'>
          <p>morsel</p>
          <img src="/images/navbar/plain_logo.png" alt="Logo" /> 
        </Link>
      </div>

      <SearchForm mode="navbar" />

      <div className="navbar-links-wrapper">
        <div className="navbar-review-link-wrapper"> 
          <Link to="/writeareview">Write a Review</Link>
        </div> 

        <div className="navbar-buttons-wrapper">
          <SessionButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;