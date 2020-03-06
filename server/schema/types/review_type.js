
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const User = require('../../models/User');
const Review = require('../../models/Review');
const Restaurant = require('../../models/Restaurant')

const UserType = require('./user_type');
const RestaurantType = require("./restaurant_type");

const ReviewType = new GraphQLObjectType({
  name: 'ReviewType',
  fields: () => ({
    _id: { type: GraphQLID },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then(user => user)
          .catch(err => null)
      }
    },
    restaurant: {
      type: require('./restaurant_type'),
      resolve(parentValue) {
        return Review.findById(parentValue._id)
          .populate('restaurant')
          .then(review => {
            return review.restaurant;
          });
      }
    },
    rating: { type: GraphQLInt },
    body: { type: GraphQLString },
    photos: {
      type: new GraphQLList(require('./photo_type')),
      resolve(parentValue) {
        return Review.findPhotos(parentValue._id);
      }
    },
    date: { type: GraphQLString }
  })
})

module.exports = ReviewType;