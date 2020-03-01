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

      <div className="best-restaurants-wrapper">
        <div className="find-section-wrapper">
          <h1>Find the Best Restaurants in Town</h1>

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

        <div className="cities-wrapper">
          <h1>Morsel (put user's location here)</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;