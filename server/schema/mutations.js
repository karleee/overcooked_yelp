const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull} = graphql;

const AuthService = require("../services/auth");
const UserService = require("../services/user");
const UserType = require("./types/user_type");

const mutation = new GraphQLObjectType({
    name: "Mutation",
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
              userId: { type: new GraphQLNonNull(GraphQLID) },
              restaurantId: { type: new GraphQLNonNull(GraphQLID) }
          },
          resolve(parent, { rating, body, userId, restaurantId }) {
              return new Review({ rating, body, userId, restaurantId }).save();
          }
      },
      updateReview: {
          type: ReviewType,
          args: { 
              id: { type: new GraphQLNonNull(GraphQLID) },
              rating: { type: GraphQLInt },
              date: { type: GraphQLString },
              body: { type: GraphQLString },
          },
          resolve(parent, { id, rating, date, body }) {
              const updtObj = {};

              if(id) updtObj.id = id;
              if(date) updtObj.date = date;
              if(body) updtObj.body = body;
              if(rating) updtObj.rating = rating;

              return Review.findOneAndUpdate(
                  { id: id },
                  { $set: updtObj },
                  { new: true },
                  ( err, review ) => {
                      return review;
                  }
              )
          }
      },
      deleteReview: {
          type: ReviewType,
          args: { id: { type: new GraphQLNonNull(GraphQLID)}},
          resolve(parent, {id}) {
              return Review.remove({ id: id });
          }
      }
  }
})


module.exports = mutation;