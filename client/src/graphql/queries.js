import gql from 'graphql-tag';

export default {
  // Query to fetch all restaurants
  FETCH_RESTAURANTS: gql`
    query FetchRestaurants {
      restaurants {
        _id,
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
        },
        photos {
          user {
            firstName,
            lastName
          },
          url
        }
      }
    }
  `,
  // Query to fetch one specific restaurant
  FETCH_RESTAURANT: gql`
    query FetchRestaurant($_id: ID!) {
      restaurant(_id: $_id) {
        _id,
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
          user {
            firstName,
            lastName,
            profilePhoto,
            friends,
            reviews {
              _id
            }
          },
          review {
            date
          },
          url,
          description,
          categories
        },
        popularDishes {
          name,
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