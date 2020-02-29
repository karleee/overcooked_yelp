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

      <svg className="logo-wrapper">
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Overcooked</text>
      </svg>

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

        <div className="search-button-wrapper"></div>
      </div>
    </div>
  );
}

export default Home;