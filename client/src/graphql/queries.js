import gql from "graphql-tag";

export default {
  FETCH_REVIEW: gql`
      query FetchReview($id: ID!) {
          review(id: $id) {
              id
              date
              body
              rating
              user {
                  id
                  name
              }
          }
      }
      `,
  FETCH_REVIEWS: gql`
      query FetchReviews($restaurantId: ID!) {
          restaurant(id: $restaurantId) {
              reviews {
                  id
                  body
                  user {
                      id
                      name
                  }
                  date
                  rating
              }
          }
      }     
  `,
  // Query to fetch all restaurants
  FETCH_RESTAURANTS: gql`
    query FetchRestaurants {
      restaurants {
        id,
        name,
        price,
        category,
        location {
          streetAddress,
          city,
          state,
          zipCode
        },
        coordinates {
          latitude,
          longitude
        }
      }
    }
  `,
  // Query to fetch one specific restaurant
  FETCH_RESTAURANT: gql`
    query FetchRestaurant($id: ID!) {
      restaurant(id: $id) {
        id,
        name,
        price,
        category,
        phoneNum,
        location {
          streetAddress,
          city,
          state,
          zipCode
        },
        coordinates {
          latitude,
          longitude
        },
        hours {
          monday {
            open,
            close
          },
          tuesday {
            open,
            close
          },
          wednesday {
            open,
            close
          },
          thursday {
            open,
            close
          },
          friday {
            open,
            close
          },
          saturday {
            open,
            close
          },
          sunday {
            open,
            close
          }
        },
        amenities {
          healthScore,
          takesReservations,
          happyHourSpecials,
          delivery,
          vegetarianOptions,
          takeOut,
          acceptsCreditCards,
          wifi
        },
        reviews {
          rating,
          body,
          date
        },
        photos {
          url
        }
      }
    }
  `,
  FETCH_USERS: gql`
    query FetchUsers {
      users {
        _id
        firstName
        lastName
        email
        zipCode
      }
    }
  `,
  FETCH_USER: gql`
    query FetchUser($_id: ID!) {
      user(_id: $_id) {
        _id
        firstName
        lastName
        email
        zipCode
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  CURRENT_USER: gql`
    query CurrentUser {
      currentUserId @client
      currentUserFirstName @client
      currentUserLastName @client
    }
  `
};
