import React from 'react';

const ResultItem = ({ restaurant }) => (
  <div className="search-result-item">
    <div className="search-result-thumbnail-wrapper">
      <img src="https://via.placeholder.com/200" />
    </div>

    <div className="search-result-restaurant-detail">
      <div className="search-result-meta">
        <div className="search-result-meta-primary">
          <h2>{restaurant.name}</h2>
          <p>5 stars!</p>
          <p>$$ &bull; vietnamese</p>
        </div>

        <div className="search-result-meta-secondary">
          <p>phone</p>
          <p>Address</p>
          <p>neighborhood</p>
        </div>
      </div>

      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu rutrum velit. Suspendisse quam nisi, sagittis vel aliquet nec, interdum eu dolor.</p>
      </div>
    </div>
  </div>
);

const ResultList = ({ restaurants, find_desc, find_loc }) => {
  const capitalizedLoc = find_loc.charAt(0).toUpperCase() + find_loc.slice(1);

  if (restaurants.length) {
    return (
      <div className="search-result-restaurant-list-container">
        {find_desc ? <h1>Best {find_desc} in {capitalizedLoc}</h1> : <h1>Browsing {capitalizedLoc}</h1>}

        <div className="search-result-reservations-menu-wrapper"></div>
        <ul>
          {restaurants.map((restaurant, i) =>
            <li key={i}>
              <ResultItem restaurant={restaurant} />
            </li>
          )}
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