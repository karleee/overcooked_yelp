const graphql = require('graphql');
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull} = graphql;
const { GraphQLUpload } = require('graphql-upload');

const { singleFileUpload } = require('../services/s3');
const AuthService = require('../services/auth');
const UserService = require('../services/user');
const ReviewService = require('../services/review')
const UserType = require('./types/user_type');
const ReviewType = require('./types/review_type');

const Review = mongoose.model('review')

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      register: {
        type: UserType,
        args: {
          firstName: { type: new GraphQLNonNull(GraphQLString) },
          lastName: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          zipCode: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(_, args) {
          return AuthService.register(args);
        }
      },
      login: {
        type: UserType,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString }
        },
        resolve(_, args) {
          return AuthService.login(args);
        }
      },
      logout: {
        type: UserType,
        args: {
          _id: { type: GraphQLID }
        },
        resolve(_, args) {
          return AuthService.logout(args);
        }
      },
      verifyUser: {
        type: UserType,
        args: {
          token: { type: GraphQLString }
        },
        resolve(_, args) {
          return AuthService.verifyUser(args);
        }
      },
      seedDb: {
        type: UserType,
        args: {},
        resolve() {
          return UserService.seedDb();
        }
      },
      newReview: {
          type: ReviewType,
          args: {
              rating: { type: GraphQLInt },
              body: { type: GraphQLString },
              restaurantId: { type: new GraphQLNonNull(GraphQLID) },
              photo: { type: GraphQLUpload }
          },
          async resolve(parent, { rating, body, photo, restaurantId }, context) {
            const user = await AuthService.verifyUser(context)
            return ReviewService.newReview(rating, body, user, restaurantId, photo)
          }
      },
      updateReview: {
          type: ReviewType,
          args: { 
              _id: { type: new GraphQLNonNull(GraphQLID) },
              rating: { type: GraphQLInt },
              date: { type: GraphQLString },
              body: { type: GraphQLString },
              photo: { type: GraphQLUpload }
          },
          resolve(parent, { _id, rating, date, photo, body }) {
            debugger; // what is photo here?
            console.log("photo before reviewservice", photo);
            return ReviewService.updateReview(_id, rating, date, body, photo);
          }
      },
      deleteReview: {
          type: ReviewType,
          args: { _id: { type: new GraphQLNonNull(GraphQLID)}},
          resolve(parent, {_id}) {
              return Review.remove({ _id: _id });
          }
      }
  }
})


module.exports = mutation;