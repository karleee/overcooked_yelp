const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const User = mongoose.model("user");
const UserType = require("./user_type");
const RestaurantType = require("./restaurant_type");
const Restaurant = mongoose.model("restaurant");

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, { _id }) {
                return User.findById(_id);
            }
        },
        restaurant: {
            type: RestaurantType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Restaurant.findbyId(id)
            }
        },
    })
});

module.exports = RootQueryType;