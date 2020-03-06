import gql from "graphql-tag";

export default {
  NEW_REVIEW: gql`
      mutation newReview($rating: Int, $body: String, $restaurantId: ID!) {
          newReview(rating: $rating, body: $body, restaurantId: $restaurantId) {
              _id
              rating
              date
              body
              user {
                _id
                firstName
              }
          }
      }
  `,
  DELETE_REVIEW: gql`
      mutation deleteReview($id: ID!) {
          deleteReview(_id: $id) {
              _id
          }
      }
  `,
  UPDATE_REVIEW: gql`
      mutation updateReview($_id: ID!, $body: String, $rating: Int, $date: String) {
          updateReview(_id: $_id, body: $body, rating: $rating, date: $date) {
              _id
              body
              rating
              date
          }
      }
  `,
  
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
        _id
        firstName
        lastName
        zipCode
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
        errors
        _id
        firstName
        lastName
        zipCode
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $zipCode: String!) {
      register(firstName: $firstName, lastName: $lastName, email: $email, password: $password, zipCode: $zipCode) {
        token
        loggedIn
        errors
        _id
        firstName
        lastName
        zipCode
      }
    }
  `
};
