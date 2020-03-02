import gql from "graphql-tag";

export default {
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
