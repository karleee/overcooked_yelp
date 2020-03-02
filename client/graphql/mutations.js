import gql from "graphql-tag";

export default {
    NEW_REVIEW: gql`
        mutation newReview($rating: Integer, $body: String, $user: ID!, $restaurant: ID!) {
            newReview(rating: $rating, body: $body, user: $user, restaurant: $restaurant) {
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
    UPDATE_REVIEW: gql`
        mutation updateReview($id: ID!, $rating: Integer, $body: String, $userId: ID!, $restaurantId: ID!) {
            updateReview(id: $id, rating: $rating, body: $body, userId: $userId, restaurantId: $restaurantId) {
                id,
                rating,
                date,
                body,
                user,
            }
        }
    `,

}