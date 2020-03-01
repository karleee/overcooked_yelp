import React from 'react';
import '../assets/stylesheets/reset.css';
import '../assets/stylesheets/App.css';
import '../assets/stylesheets/Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="banner-wrapper">
        <img src="/images/homepage/banner.png" alt="Homepage banner" />
        <div className="overlay-wrapper"></div>
      </div>

      <div className="logo-wrapper">
        <svg>
          <text x="50%" y="50%">morsel</text>
        </svg>
        <img src="/images/homepage/logo.png" alt="Logo image" />
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

      <div className="best-businesses-wrapper">
        <h1>Find the Best Businesses in Town</h1>
      </div>
    </div>
  );
}

export default Home;