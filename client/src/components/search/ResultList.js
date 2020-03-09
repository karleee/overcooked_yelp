import React from 'react';
import { getAverageRating, getStarImage, getDollarSigns } from '../../util/restaurant_util';
import { Link } from 'react-router-dom';

const ResultItem = ({ restaurant, num }) => {
  // Getting average rating from all reviews
  const average = getAverageRating(restaurant.reviews);

  // Getting star rating indicator image
  const stars = getStarImage(average);

  const dollars = getDollarSigns(restaurant.price);
  const firstReview = restaurant.reviews[0].body;

  return (
    <div className="search-result-item-container">
      <div className="search-result-thumbnail-wrapper">
        <img src={restaurant.photos[0].url} alt="Search result restaurant thumbnail" />
      </div>

      <div className="search-result-details-wrapper">
        <div className="search-result-meta">
          <div className="search-result-meta-primary">
            <div className="search-result-header-wrapper">
              <h2>{num}.</h2>
              <Link to={`/restaurants/${restaurant._id}`}><h2>{restaurant.name}</h2></Link>
            </div>

            <div className="search-result-rating-and-reviews-wrapper">
              <img src={`/images/restaurant_detail/ratings/${stars}.png`} alt='Rating icon' />
              <p>{restaurant.reviews.length}</p>
            </div>

            <div className="search-result-price-category-wrapper">
              <p>{dollars}</p> 
              <p class="search-result-price-and-category-dot-wrapper">•</p>
              <p>{restaurant.category}</p>
            </div>
          </div>

          <div className="search-result-meta-secondary">
            <p>{restaurant.phoneNum}</p>
            <p>{restaurant.location.streetAddress}</p>
            <p>{restaurant.location.city}</p>
          </div>
        </div>

        <div className="search-result-review-wrapper">
          <p>"{firstReview.length > 100 ? `${firstReview.slice(0, 90)}...` : firstReview}"</p>
        </div>
      </div>
    </div>
  );
};

const ResultList = ({ restaurants, find_desc, find_loc }) => {
  const location = find_loc.split(' ');
  const capitalizedLoc = [];

  location.map(word => {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    capitalizedLoc.push(capitalizedWord);
  });

  if (restaurants.length) {
    return (
      <div className="search-result-restaurant-list-container">
        {find_desc ? <h1>Best {find_desc} in {capitalizedLoc.join(' ')}</h1> : <h1>Browsing {capitalizedLoc.join(' ')}</h1>}

        <p className="all-reviews-wrapper">All Results</p>

        <div className="search-result-reservations-menu-wrapper"></div>

        <ul className="restaurants-list-wrapper">
          {restaurants.map((restaurant, i) =>
            <li key={i}>
              <ResultItem restaurant={restaurant} num={i + 1} />
            </li>
          )}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="search-result-restaurant-list-container">
        <h1>No results for {find_desc || "restaurants"} in {capitalizedLoc.join(' ')}</h1>

        <div className="suggestions-container">
          <strong>Suggestions for improving the results:</strong> 

          <ul className="suggestions-list-wrapper">
            <li>Try a larger search area</li>
            <li>Try a different location.</li>
            <li>Check the spelling or try alternate spellings.</li>
            <li>Try a more general search. e.g. "pizza" instead of "pepperoni"</li>
          </ul>
        </div>
      </div>
    );
  }
};

export default ResultList;