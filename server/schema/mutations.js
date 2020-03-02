const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        newReview: {
            type: ReviewType,
            args: {
                rating: { type: GraphQLInt },
                body: { type: GraphQLString },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                restaurantId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, { rating, body, userId, restaurantId }) {
                return new Review({ rating, body, userId, restaurantId }).save();
            }
        },
        updateReview: {
            type: ReviewType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLID) },
                rating: { type: GraphQLInt },
                date: { type: GraphQLString },
                body: { type: GraphQLString },
            },
            resolve(parent, { id, rating, date, body }) {
                const updtObj = {};

                if(id) updtObj.id = id;
                if(date) updtObj.date = date;
                if(body) updtObj.body = body;
                if(rating) updtObj.rating = rating;

                return Review.findOneAndUpdate(
                    { id: id },
                    { $set: updtObj },
                    { new: true },
                    ( err, review ) => {
                        return review;
                    }
                )
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