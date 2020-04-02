
const graphql = require('graphql');
const graphqlDate = require('graphql-iso-date');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList } = graphql;
const { GraphQLDate } = graphqlDate;

const { s3 } = require('../../services/s3');
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
    rating: { type: GraphQLFloat },
    body: { type: GraphQLString },
    photos: {
      type: new GraphQLList(require('./photo_type')),
      resolve(parentValue) {
        return Review.findPhotos(parentValue._id);
      }
    },
    photo: { 
      type: GraphQLString,
      resolve(parentValue) {
        let photoUrl;
        if (parentValue.photo) {
          photoUrl = s3.getSignedUrl('getObject', {
            Bucket: "morsel-media",
            Key: parentValue.photo
          });
        }
        return photoUrl || parentValue.photo;
      }
    },
    date: { type: GraphQLDate } 
  })
})

module.exports = ReviewType;