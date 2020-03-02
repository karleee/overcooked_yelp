import gql from "graphql-tag";

export default {
    FETCH_REVIEW: gql`
        query FetchReview($id: ID!) {
            review(id: $id) {
                id,
                date,
                body, 
                rating
            }
        }
        `,
        
}