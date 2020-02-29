import gql from "graphql-tag";

export default {
  FETCH_USERS: gql`
    {
      users {
        _id
        firstName
        lastName
        email
        zipCode
      }
    }
  `
};
