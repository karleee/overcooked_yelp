const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;
const User = require('../../models/User');

// Creating GraphQL object type for user
const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    zipCode: { type: GraphQLInt },
    profilePhoto: { type: GraphQLString },
    friends: { type: GraphQLInt },
    reviews: {
      type: new GraphQLList(require('./review_type')),
      resolve(parentValue) {
        return User.findReviews(parentValue._id);
      }
    },
    photos: {
      type: new GraphQLList(require('./photo_type')),
      resolve(parentValue) {
        return User.findPhotos(parentValue._id);
      }
    },
    token: { type: GraphQLString }, 
    loggedIn: { type: GraphQLBoolean },
    errors: { type: new GraphQLList(GraphQLString) }
  })
})

module.exports = UserType;