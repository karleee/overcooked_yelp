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
}