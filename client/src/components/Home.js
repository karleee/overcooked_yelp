import React from 'react';
import '../assets/stylesheets/reset.css';
import '../assets/stylesheets/App.css';
import '../assets/stylesheets/Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="banner-wrapper">
        <img src="/images/homepage/banner.png" id="Homepage banner" />
        <div className="overlay-wrapper"></div>
      </div>

      <h1>Overcooked</h1>

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