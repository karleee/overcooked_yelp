const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const User = require('../../models/User');
const Photo = require('../../models/Photo');

// Creating GraphQL object type for photo
const PhotoType = new GraphQLObjectType({
  name: 'PhotoType',
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
        return Photo.findById(parentValue._id)
          .populate('restaurant')
          .then(photo => {
            return photo.restaurant;
          });
      }
    },
    review: {
      type: require('./review_type'),
      resolve(parentValue) {
        return Photo.findById(parentValue._id)
          .populate('review')
          .then(photo => {
            return photo.review;
          });
      }
    },
    url: { type: GraphQLString },
    description: { type: GraphQLString },
    categories: { type: new GraphQLList(GraphQLString) }
  })
})

module.exports = PhotoType;