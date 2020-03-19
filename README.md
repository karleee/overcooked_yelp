# Morsel

## Introduction
Morsel is a single page MERN stack application that parodies off the concept and style of Yelp. Drawing inspiration from the popular 'Overcooked' video game series, visitors to the site are able to browse fictional restaurants and view restaurant photos.

<kbd>
<img src="https://github.com/karleee/morsel/blob/master/README_images/morsel_main1.png" alt="Homepage" width="900px"     border="1">
</kbd>

<br>
<br>
<br>

<kbd>
<img src="https://github.com/karleee/morsel/blob/master/README_images/morsel_main2.png" alt="Homepage" width="900px" border="1">
</kbd>

## How It Works
To see the most up to date version, please visit [the homepage](https://themorsel.herokuapp.com/).

## Technologies Used
* Routing – Express
* Database – MongoDB
* Querying – GraphQL
* Libraries – Mongoose, React
* Server Environment – NodeJS
* Hosting – Heroku


## Feature Spotlight
### Dynamic Star Rating Indicator

Using the provided images of star ratings from the Yelp developer resources, each restaurant page dynamically renders the correct average rating based on the individual ratings from all of its current reviews.

<kbd>
<img src="https://github.com/karleee/morsel/blob/master/README_images/morsel_restaurant1.png" alt="Homepage" width="900px" border="1">
</kbd>

<br>
<br>

**Challenges**
> Infrastructure Design and DRY Principles

The first challenge to build out this feature was to preplan where and if this would be used throughout the application. Initially, this started out as a component specific function that was limited to the scope of the restaurant page only, however, as we progressed through our app, we realized that this process of calculating an average review **also** determined which rating image to display to the frontend. But what about in the case of a single user writing a single review for a restaurant? How do we display a rating indicator image for them as well? 

<br>

> Challenge # 2

Info for challenge # 2

<br>

> Challenge # 3

Info for challenge # 3

<br>
<br>

**Solutions**
> Infrastructure Design and DRY Principles: Solution

Following the core principles of DRY, rather than creating two different functions to handle a single and multiple ratings, we were able to refactor the code into two simple utility functions that could be used in both situations.

We created a generic function that would calculate the average of multiple ratings, and another that would take in a number value which it would use to return the correct string indicating which rating image to give to the frontend. In the case of a single review, all we would have to do is pass in the review's seeded number rating or a user's given rating to the `getStarImage` function. And a similar process follows for handling multiple reviews; except, in that case we would need to use the `getAverageRating` function first to get the correct float value to pass in.

```javascript
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
```

<br>

> Problem: Solution

Solution text

<br>

> Problem: Solution

Solution text

------

### Feature #2



**Challenges**
> Challenge #1

> Challenge #2

> Challenge #3

**Solutions**

> Solution #1


  
> Solution #2


> Solution #3



## Future Updates


| Version Number        | Updates           | 
| :------------- |:------------- |
| Version 1.1      | Expanded database of restaurants and locations |  
