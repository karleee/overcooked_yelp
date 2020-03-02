const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        newReview: {
            type: ReviewType,
            args: {
                rating: { type: GraphQLInt },
                body: { type: GraphQLString }
            },
            resolve(parent, { rating, body }) {
                return new Review({ rating, body }).save();
            }
        },
        updateReview: {
            type: ReviewType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLID) },
                rating: { type: GraphQLInt },
                date: { type: GraphQLString },
                body: { type: GraphQLString },
            }
        },
        deleteReview: {
            type: ReviewType,
            args: { id: { type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, {id}) {
                return Review.remove({ id: id });
            }
        }
    }

})

module.exports = mutation;