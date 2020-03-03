const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RestaurantType = require("./restaurant_type");
const Restaurant = mongoose.model("restaurant");
const Review = require("../");
const ReviewType = require("./review_type")

const RootQueryType = new GraphQLObjectType({ 
    name: "RootQueryType",
    fields: () => ({
        restaurant: {
            type: RestaurantType,
            args: { id: { type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, {id} ) {
                return Restaurant.findbyId(id)
            }
        },
        review: {
            type: ReviewType,
            args: { 
                restaurantId: { type: new GraphQLNonNull(GraphQLID)}, 
                userId: { type:  new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, {restaurantId, userId} ) {
                return Review.findOne({restaurant: restaurantId, user: userId})
            }
        },

    })
})

module.exports = RootQueryType;