// Setting amenity values from boolean to string for display
export const setAmenityValue = (key, value) => {
  let amenityValue;
  if (key === 'healthScore') {
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

// Formatting camelcased string into correct capitalization
export const getCapitalizedKey = key => {
  let spacedKey;
  let spacedKeyArray;
  let capitalizedKeyArray = [];

  spacedKey = key.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  spacedKeyArray = spacedKey.split(' ');
  spacedKeyArray.map(word => capitalizedKeyArray.push(word[0].toUpperCase() + word.slice(1)));

  return capitalizedKeyArray.join(' ');
};

// Calculates average rating of restaurant based on all reviews
export const getAverageRating = reviews => {
  let total = 0;

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

// Gets the photos or reviews containing the keyword in the description
export const getPopularDishOccurences = (collection, dish, type) => {
  const dishArray = dish.split(' ');
  const lowerCasedDish = [];
  let foundOccurences = [];

  dishArray.forEach(word => {
    const letters = /&[a-zA-z]+$/;
    const lastLetter = word.slice(-1);
    let unpunctuatedWord;

    if (!lastLetter.match(letters)) {
      unpunctuatedWord = word.slice(0, word.length);
    } else {
      unpunctuatedWord = word;
    }

    lowerCasedDish.push(unpunctuatedWord.toLowerCase());
  });

  collection.forEach(item => {
    const firstKeyword = lowerCasedDish[0];
    const secondKeyword = lowerCasedDish[1];
    let lowerCasedBody = [];
    let body;

    if (type === 'photos' && item.description) {
      body = item.description.split(' ');
    } else if (type === 'reviews' && item.body) {
      body = item.body.split(' ');
    } else {
      return;
    }

    body.forEach(word => {
      lowerCasedBody.push(word.toLowerCase());
    });

    if (lowerCasedBody.includes(firstKeyword) && lowerCasedBody[lowerCasedBody.indexOf(firstKeyword) + 1] === secondKeyword) foundOccurences.push(item);
  });

  return foundOccurences;
}

// Converting price into dollar sign equivalents
export const getDollarSigns = price => {
  let dollars = [];

  for (let i = 0; i < price; i++) {
    dollars.push('$');
  }

  return dollars.join(''); 
}