import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/Home.css';

import RestaurantIndex from '../restaurants/RestaurantIndex';
import SessionButton from '../session/SessionButton';

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="banner-wrapper">
        <div className="home-nav-bar-wrapper">
          <p>Write a Review</p>
          <SessionButton />
        </div>

        <img src="/images/homepage/banner.png" alt="Homepage banner" />
        <div className="overlay-wrapper"></div>

        <div className="logo-wrapper">
          <svg>
            <text x="50%" y="50%">morsel</text>
          </svg>
          <img src="/images/homepage/logo.png" alt="Logo" />
        </div>

        <div className="search-input-wrapper">
          <div className="find-input-wrapper">
            <label>
              Find
            <input
                type="text"
                placeholder="burgers, pancakes, burritos, salads..."
              />
            </label>
          </div>

          <div className="separator-wrapper"></div>

          <div className="near-input-wrapper">
            <label>
              Near
            <input
                type="text"
                placeholder="Put user's current location here"
              />
            </label>
          </div>

          <div className="search-button-wrapper">
            <i className="search-icon"></i>
          </div>
        </div>
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