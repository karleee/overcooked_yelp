import React from 'react';
import RestaurantIndex from '../restaurants/RestaurantIndex';
import SessionButton from '../session/SessionButton';
import SearchForm from '../search/SearchForm';
import '../../assets/stylesheets/Home.css';
import '../../assets/stylesheets/SearchForm.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="banner-container">
        <div className="home-nav-bar-container">
          <div className="write-review-wrapper">
            <p>Write a Review</p> 
          </div>

          <div className="home-login-logout-wrapper">
            <SessionButton />
          </div>
        </div>

        <img src="/images/homepage/banner.png" alt="Homepage banner" /> 

        <div className="overlay-wrapper"></div>

        <div className="logo-wrapper">
          <svg>
            <text x="50%" y="50%">morsel</text>
          </svg>
          <img src="/images/homepage/logo.png" alt="Logo" />
        </div>
        
        <SearchForm />
      </div>

      <div className="best-restaurants-wrapper">
        <div className="header-wrapper">
          <h1>Find the Best Restaurants in Town</h1>
        </div>

        <div className="restaurants-wrapper">
          <div className="surf-and-turf-wrapper">
            <div className="thumbnail-wrapper"></div>
            <p>Surf 'N' Turf</p>
          </div>

          <div className="holiday-desserts-wrapper">
            <div className="thumbnail-wrapper"></div>
            <p>Holiday Desserts</p>
          </div>

          <div className="chinese-wrapper">
            <div className="thumbnail-wrapper"></div>
            <p>Chinese</p>
          </div>

          <div className="burgers-wrapper">
            <div className="thumbnail-wrapper"></div>
            <p>Burgers</p>
          </div>
        </div>
      </div>

      <div className="main-content-wrapper">
        <div className="header-wrapper">
          <h1>Morsel (put user's location here)</h1>

          <div className="other-cities-wrapper">
            <div className="cities-wrapper">
              <p>Tahoe City</p>
              <p>Honolulu</p>
              <p>Los Angeles</p>
              <p>San Francisco</p>
              <p>Tokyo</p>
              <p>Portland</p>
              <p><i className="more-cities-icon"></i>More Cities</p>
            </div> 

            <div className="underline-wrapper"></div>
          </div>

          <div className="new-restaurants-wrapper">
            <h2>Hot & New Businesses</h2>

            <RestaurantIndex />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;