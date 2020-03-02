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

}