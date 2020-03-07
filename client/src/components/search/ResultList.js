import React from 'react';

const ResultList = ({ restaurants, find_desc, find_loc }) => {
  if (restaurants.length) {
    return (
      <div className="search-result-restaurant-list-wrapper">
        <h1>Best {find_desc || "restaurants"} in {find_loc}</h1>

        <div className="search-result-reservations-menu-wrapper"></div>
        <ul>
          {restaurants.map((restaurant, i) => <li key={i}>{restaurant.name}</li>)}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="search-result-restaurant-list-wrapper">
        <h1>No results for {find_desc || "restaurants"} in {find_loc}</h1>
        <p>Nothing to Shaquille O'Neal 😞</p>
        <strong>Suggestions for improving the results:</strong>
        <ul>
          <li>Try a larger search area</li>
          <li>Try a different location.</li>
          <li>Check the spelling or try alternate spellings.</li>
          <li>Try a more general search. e.g. "pizza" instead of "pepperoni"</li>
        </ul>
      </div>
    );
  }
};

export default ResultList;