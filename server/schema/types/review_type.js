const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean} = graphql;
const Restaurant = mongoose.model("restaurant");
const User = mongoose.model("user")
const Review = mongoose.model("review")

const UserType = require('./user_type');
const RestaurantType = require("./restaurant_type");


const ReviewType = new GraphQLObjectType({
    name: "ReviewType",
    fields: () => ({
        id: { type: GraphQLID },
        user: {
            type: UserType,
            resolve(parent) {
                return User.findById(parent.user)
                    .then(user => user)
                    .catch(err => null);
            }
        },
        restaurant: { 
            type: RestaurantType,
            resolve(parentVal) {
                return Restaurant.findById(parentVal.restaurant)
                    .then(restaurant => restaurant)
                    .catch(err => null);
            }
        },
        rating: { type: GraphQLInt },
        date: { type: GraphQLString },
        body: { type: GraphQLString },
    })
})

//     user: {
//       type: UserType,
//       resolve(parentValue) {
//         return UserType.findById(parentValue.user)
//           .then(user => user)
//           .catch(err => null)
//       }
//     },
//     restaurant: {
//       type: require('./restaurant_type'),
//       resolve(parentValue) {
//         return Review.findById(parentValue.id)
//           .populate('restaurant')
//           .then(review => {
//             return review.restaurant;
//           });
//       }
//     },
//   })
// 

module.exports = ReviewType;