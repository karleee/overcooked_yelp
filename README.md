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
### Dynamic User Based Elements

The first dynamic user based element is the average rating indicator located at the top of each restaurant page. Using the provided images of star ratings from the Yelp developer resources, each restaurant page dynamically renders the correct average rating based on the individual ratings from all of its current reviews.

<kbd>
<img src="https://github.com/karleee/morsel/blob/master/README_images/morsel_restaurant1.png" alt="Homepage" width="900px" border="1">
</kbd>

<br>
<br>

The second element is the open and closed label indicator that dynamically changes based on the user's current local time. In addition to time tracking, this element also adjusts itself according to the current day of the week that the user is viewing the website on.

<kbd>
<img src="https://github.com/karleee/morsel/blob/master/README_images/morsel_restaurant2.png" alt="Homepage" width="900px" border="1">
</kbd>

<br>
<br>

**Challenges**
> Design and DRY Principles

The most difficult challenge to build out the dynamic rating feature was to preplan where and if this would be used throughout the application. Initially, this started out as a component specific function that was limited to the scope of the restaurant page only, however, as we progressed through our app, we realized that this process of calculating an average review **also** determined which rating image to display to the frontend. But what about in the case of a single user writing a single review for a restaurant? How do we display a rating indicator image for them as well? 

<br>

> Weekday Mapping

Another interesting challenge that came up while I was building the open and closed label indicators was the dilemma of using the correct index to get the right weekday. The built in Javascript function to get the index of a weekday from a `Date` object begins the array with `0` as Sunday. However, to display the days in the correct order, I couldn't use the same index to display weekdays on the frontend; rather than displaying days in the order of Sun, Mon, Tues, etc., I needed to display them as Mon, Tues, Wed, etc. on the frontend.

<br>

> Noon Time

Accounting for the flip in morning and afternoon (am vs pm) for determining whether a restaurant's operating hours was quite a tricky problem. Simply checking if the user's current hour was greater or less than the restaurant's opening and closing times, as well as matching am and pm, seemed to not hold true anymore (i.e. A user's current time is 12:00 pm and the restaurant opens at 11:00 am. If the check was only looking for hours greater than 11 **and** for the time of day to be am, then that would cover time slots between 11:00 am and 12:00 pm, but **not** 12:00 pm).

<br>
<br>

**Solutions**
> Design and DRY Principles: Solution

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

> Weekday Mapping: Solution

To account for the offset in the index number of the weekday returned by the Javascript `getDay` function, I used a set of coniditonals to check for the special edge cases of index 0 and index 1. Without any altering, index 0 points to a Sunday and index 1 points to a Monday. 

If those edge case values were returned as the current day's index, then adjust them accordingly to match an array that would have began at Mon. If not, then simply subtract one to get the correct index in my prefilled array of weekdays (i.e. If the current day is a Wed, then the index number returned by the `getDay` function would be 3; and after being altered in the conditional, the new index number would be 2. Which corresponds correctly to an array of `[Mon, Tues, Wed, ...]`).

```javascript
  // Adjusted currentDay index to account for Sunday (index 0 vs index 6 in the open/close hours array)
  let newCurrentDayIndx;

  if (currentDay === 0) {
    newCurrentDayIndx = 6;
  } else if (currentDay === 1) {
    newCurrentDayIndx = 0;
  } else {
    newCurrentDayIndx = currentDay - 1;
  }
```

<br>

> Noon Time: Solution

Although this is a current fix to the problem, in the future I would like to implement a more bulletproof solution. After researching multiple restaurants, I found that a majority, if not all of them, are **always** open during lunch time.

------

### Restaurant Photo Gallery

In addition to the basic functionalities of a standard photo gallery where the user has viewing and scrolling capabilities, photos are also filtered based on their corresponding tags. A photo may also belong to multiple categories at once.

<kbd>
<img src="https://github.com/karleee/morsel/blob/master/README_images/morsel_gallery1.png" alt="Homepage" width="900px" border="1">
</kbd>

<br>
<br>

<kbd>
<img src="https://github.com/karleee/morsel/blob/master/README_images/morsel_gallery2.png" alt="Homepage" width="900px" border="1">
</kbd>

<br>
<br>

**Challenges**
> Landing Photos

Because the original Yep website used all of a restaurant's photos as the default or initial gallery index upon loading, we not only had to filter out each photo into its respective categories, but we also had to implement a way to have all of the restaurant photos available right when the user clicked onto the page.

> Date Object Conversion

During our initial project setup, we had chosen to use a normal string to represent the date for when a review was written, however, to accomodate how new user reviews were being stored in the database, it made more sense to use a different data type to store the dates for each review. 

> Challenge #3

**Solutions**
> Landing Photos: Solution

The obvious components of the solution was to first store all of a restaurant's photos into a variable, and then focus on filtering based on an image's tags. However, we also needed a local state to keep track of **which** subcategory of photos that the user was clicking on. We could not initially start the local state with all of a restaurant's photos because the query only happens in the `render` method, however, we could initially set the state to an empty array. And only once the query is made, then we were able to initially change the state to all of the fetched restaurant's photos.

```javascript
  // Constructor for GalleryIndex component
  constructor(props) {
    super(props);
    this.state = { 
      showModal: false,
      currentImage: 0,
      photos: [],
      viewingTab: 'viewAll'
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePhotos = this.togglePhotos.bind(this);
  }
  
  // Line of code in the render method that sets the photos variable 
  // Within the Query tag
  const allPhotos = data.restaurant.photos;
 ```
  
  
> Date Object Conversion: Solution

As mentioned above, storing the date in a normal string was a naive approach that we had originally implemented; if we continued down this route, extracting date information to perform more complicated tasks would have been unnecessarily complicated. Specifically, storing months as a word rather than in a numerical format would have made performing a date ordering operation more tedious. To perform something like this with our design at the time would have required us to either formulate a way to determine order based on word string (i.e. 'January', 'February', etc.) **or** to perform an extra step of converting months into numerical equivalents (i.e. '01', '02', etc.).

Instead, we decided to change the data type from a normal string to a Javascript `Date` object. Once we implemented this, extracting a word string version of the date simply became a matter of splitting the `Date` object on a specific character and storing values into variables. Using a `Date` object **also** allowed for an easy way to sort reviews based on the date that they were created.

```javascript
  // Ordering reviews by date with most recent on top
  orderReviews(reviews) {    
    const reviewsCopy = reviews.slice();

    reviewsCopy.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date)
    })
    
    return reviewsCopy.reverse();
  }
```


> Solution #3



## Future Updates


| Version Number        | Updates           | 
| :------------- |:------------- |
| Version 1.1      | Expanded database of restaurants and locations |  
