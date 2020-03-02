const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RestaurantType = require('./restaurant_type');
const ReviewType = require('./review_type');

const Restaurant = mongoose.model('restaurant');
const Review = mongoose.model('review');

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
      args: { id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(_, { id } ) {
        return Restaurant.findbyId(id);
      }
    },
    // Queries database for all reviews
    reviews: {
      type: ReviewType,
      resolve() {
        return Review.find({});
      }
    },
    // Queries database for one specific review
    review: {
      type: ReviewType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(_, { id }) {
        return Review.findById(id);
      }
    }
  })
});

module.exports = RootQueryType;