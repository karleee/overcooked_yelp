const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RestaurantType = require('./restaurant_type');
const ReviewType = require('./review_type');
const UserType = require("./user_type");

const Restaurant = mongoose.model('restaurant');
const Review = mongoose.model('review');
const User = mongoose.model("user");

const RootQueryType = new GraphQLObjectType({ 
  name: 'RootQueryType',
  fields: () => ({
    // Querires database for all restaurants
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve() {
        return Restaurant.find({});
      }
    },
    // Queries database for one specific restaurant
    restaurant: {
      type: RestaurantType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(_, { _id } ) {
        return Restaurant.findById(_id);
      }
    },
    // Queries database for all reviews
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve() {
        return Review.find({});
      }
    },
    // Queries database for one specific review
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
    // Queries for all users
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    // Queries for a user
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { _id }) {
        return User.findById(_id);
      }
    }
  })
});

module.exports = RootQueryType;