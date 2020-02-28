const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RestaurantType = require('./restaurant_type');
const Restaurant = mongoose.model('restaurant');

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
        return Restaurant.findbyId(id)
      }
    },
  })
})

module.exports = RootQueryType;