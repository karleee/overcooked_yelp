import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';

// SearchResultIndex component returning photo gallery of images from one restaurant from backend
class SearchResultIndex extends Component {
  constructor(props) {
    super(props);
  }

  // Renders the component
  render() {
    return (
      <div className="search-result-index-wrapper">
        <Navbar />

        <div className="search-result-restaurant-list-wrapper">
          <h1>Best food in (put user's searched city/location here)</h1>

          <div className="search-result-reservations-menu-wrapper">
            <p>(If we have extra time, make a reservations menu bar here)</p>
          </div>

          <h2>All Results</h2>

          <ul>
            <p>
              (Just a note: Get restaurants into an array, map over them, use more divs to separate
              out content inside of thumbnails/to enable the display flex css styling properties)
            </p>

            <li>Put restaurant thumbnail here</li>
          </ul>
        </div>

        <div className="search-result-map-wrapper">
          <div className="search-result-map-image-wrapper"></div>
        </div>
      </div>
    );
  }
};

export default SearchResultIndex;