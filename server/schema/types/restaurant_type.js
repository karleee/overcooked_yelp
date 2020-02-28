const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;
const Restaurant = require('../../models/Restaurant');

// Creating GraphQL object type for restaurant
const RestaurantType = new GraphQLObjectType({
  name: 'RestaurantType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    id: {type: GraphQLID},
    phoneNum: { type: GraphQLString },
    location: {
      streetAddress: { type: GraphQLString },
      city: { type: GraphQLString },
      state: { type: GraphQLString },
      zipCode: { type: GraphQLInt }
    },
    coordinates: {
      latitude: { type: GraphQLInt },
      longitude: { type: GraphQLInt }
    },
    hours: {
      monday: { 
        open: { type: GraphQLString },
        close: { type: GraphQLString }
      },
      tuesday: { 
        open: { type: GraphQLString },
        close: { type: GraphQLString }
      },
      wednesday: { 
        open: { type: GraphQLString },
        close: { type: GraphQLString }
      },
      thursday: { 
        open: { type: GraphQLString },
        close: { type: GraphQLString }
      },
      friday: { 
        open: { type: GraphQLString },
        close: { type: GraphQLString }
      },
      saturday: { 
        open: { type: GraphQLString },
        close: { type: GraphQLString }
      },
      sunday: { 
        open: { type: GraphQLString },
        close: { type: GraphQLString }
      }
    },
    amenities: {
      healthScore: { type: GraphQLInt },
      reservations: { type: GraphQLBoolean },
      happyHourSpecials: { type: GraphQLBoolean },
      delivery: { type: GraphQLBoolean },
      vegetarian: { type: GraphQLBoolean },
      takeOut: { type: GraphQLBoolean },
    },
    reviews: {
      type: new GraphQLList(require('./review_type')),
      resolve(parentValue) {
        return Restaurant.findProducts(parentValue._id);
      }
    }
  })
})

module.exports = RestaurantType;