const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const UserType = require('./user_type');
const Review = require('../../models/Review');

// Creating GraphQL object type for review
const ReviewType = new GraphQLObjectType({
  name: 'ReviewType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue) {
        return UserType.findById(parentValue.user)
          .then(user => user)
          .catch(err => null)
      }
    },
    restaurant: {
      type: require('./restaurant_type'),
      resolve(parentValue) {
        return Review.findById(parentValue.id)
          .populate('restaurant')
          .then(review => {
            return review.restaurant;
          });
      }
    },
    id: { type: GraphQLID },
    rating: { type: GraphQLInt },
    body: { type: GraphQLString },
    date: { type: GraphQLString }
  })
})

module.exports = ReviewType;