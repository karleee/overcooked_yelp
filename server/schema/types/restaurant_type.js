const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;
const Restaurant = mongoose.model("restaurant");

const RestaurantType = new GraphQLObjectType({
    name: "RestaurantType",
    fields: () => ({
        name: { type: GraphQLString },
        id: {type: GraphQLID},
        phoneNum: { type: GraphQLString },
        address: {
            streetAddress: { type: GraphQLString },
            city: { type: GraphQLString },
            state: { type: GraphQLString },
            zipCode: { type: GraphQLInt },
        },
        latitude: { type: GraphQLInt },
        longitude: { type: GraphQLInt },
        hours: {
            monday: { 
                open: { type: GraphQLString },
                close: { type: GraphQLString }
            },
            tuesday: { 
                open: { type: GraphQLString },
                close: { type: GraphQLString }
            },
            wednesday: { 
                open: { type: GraphQLString },
                close: { type: GraphQLString }
            },
            thursday: { 
                open: { type: GraphQLString },
                close: { type: GraphQLString }
            },
            friday: { 
                open: { type: GraphQLString },
                close: { type: GraphQLString }
            },
            saturday: { 
                open: { type: GraphQLString },
                close: { type: GraphQLString }
            },
            sunday: { 
                open: { type: GraphQLString },
                close: { type: GraphQLString }
            }
        },
        amenities: {
            healthScore: { type: GraphQLInt },
            reservations: { type: GraphQLBoolean },
            happyHourSpecials: { type: GraphQLBoolean },
            delivery: { type: GraphQLBoolean },
            vegetarian: { type: GraphQLBoolean },
            takeOut: { type: GraphQLBoolean },
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve(parentValue) {
                return Restaurant.findById(parentValue.id)
                    .populate("reviews")
                    .then(restaurant => restaurant.reviews);
            }
        }
    })
})

module.exports = RestaurantType;