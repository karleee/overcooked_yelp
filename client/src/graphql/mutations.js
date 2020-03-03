import gql from "graphql-tag";

export default {
  NEW_REVIEW: gql`
      mutation newReview($rating: Integer, $body: String, $userId: ID!, $restaurantId: ID!) {
          newReview(rating: $rating, body: $body, userId: $userId, restaurantId: $restaurant) {
              id,
              rating,
              date,
              body,
              user,
          }
      }
  `,
  DELETE_REVIEW: gql`
      mutation deleteReview($id: ID!) {
          deleteReview(id: $id) {
              id
          }
      }
  `,
  UPDATE_REVIEW_BODY: gql`
      mutation updateReview($id: ID!, $body: String) {
          updateReview(id: $id, body: $body) {
              id,
              body,
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
      }
    }
  `
};
