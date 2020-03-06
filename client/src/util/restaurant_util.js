// Setting amenity values from boolean to string for display
export const setAmenityValue = (key, value) => {
  let amenityValue;
  if (key === 'Health Score') {
    amenityValue = value;
  } else {
    if (value) {
      amenityValue = 'Yes';
    } else {
      amenityValue = 'No';
    }
  }
  return amenityValue;
};

// Calculates average rating of restaurant based on all reviews
export const getAverageRating = reviews => {
  let total = 0;
  // let average;

  reviews.forEach(review => {
    total += review.rating;
  });

  return total / reviews.length;
};

// Determines which star rating image to use in a img src url
export const getStarImage = average => {
  let stars;

  if (average === 0) {
    stars = 'zero';
  } else if (average > 0 && average <= 1) {
    stars = 'one';
  } else if (average > 1 && average < 1.6) {
    stars = 'one_and_half';
  } else if (average >= 1.6 && average <= 2) {
    stars = 'two';
  } else if (average > 2 && average < 2.6) {
    stars = 'two_and_half';
  } else if (average >= 2.6 && average <= 3) {
    stars = 'three';
  } else if (average > 3 && average < 3.6) {
    stars = 'three_and_half';
  } else if (average >= 3.6 && average <= 4) {
    stars = 'four';
  } else if (average > 4 && average < 4.6) {
    stars = 'four_and_half';
  } else {
    stars = 'five';
  }

  return stars;
};