import React from 'react';
import { Link } from 'react-router-dom'; // remove me because the search should be a form

const SearchForm = () => (
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
        <input type="text" placeholder="Put user's current location here" />
      </label>
    </div>

    <div className="search-button-wrapper">
      <Link to="/search">
        <i className="search-icon"></i>
      </Link>
    </div>
  </div>
);

export default SearchForm;