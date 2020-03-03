import gql from 'graphql-tag';

export default {
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
  `
};