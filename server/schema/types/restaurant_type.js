const graphql = require('graphql');
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLList } = graphql;
const Restaurant = require('../../models/Restaurant');

// Creating GraphQL object type for sub fields of data
const Coordinates = new GraphQLObjectType({
  name: 'Coordinates',
  fields: () => ({
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat }
  }),
});

const Location = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    streetAddress: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zipCode: { type: GraphQLInt }
  }),
});

const Times = new GraphQLObjectType({
  name: 'Times',
  fields: () => ({
    open: { type: GraphQLString },
    close: { type: GraphQLString }  
  })
});

const Hours = new GraphQLObjectType({
  name: 'Hours',
  fields: () => ({
    monday: { type: Times },
    tuesday: { type: Times },
    wednesday: { type: Times },
    thursday: { type: Times },
    friday: { type: Times },
    saturday: { type: Times },
    sunday: { type: Times }
  })
});

const Amenities = new GraphQLObjectType({
  name: 'Amenities',
  fields: () => ({
    healthScore: { type: GraphQLString },
    takesReservations: { type: GraphQLBoolean },
    happyHourSpecials: { type: GraphQLBoolean },
    delivery: { type: GraphQLBoolean },
    vegetarianOptions: { type: GraphQLBoolean },
    takeOut: { type: GraphQLBoolean },
    acceptsCreditCards: { type: GraphQLBoolean },
    wifi: { type: GraphQLBoolean }
  }),
});

const PopularDishes = new GraphQLObjectType({
  name: 'PopularDishes',
  fields: () => ({
    name: { type: GraphQLString },
    url: { type: GraphQLString }
  }),
});

// Creating GraphQL object type for restaurant
const RestaurantType = new GraphQLObjectType({
  name: 'RestaurantType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    category: { type: GraphQLString },
    phoneNum: { type: GraphQLString },
    location: { type: Location },
    coordinates: { type: Coordinates },
    hours: { type: Hours },
    amenities: { type: Amenities },
    reviews: {
      type: new GraphQLList(require('./review_type')),
      resolve(parentValue) {
        return Restaurant.findReviews(parentValue._id);
      }
    },
    photos: {
      type: new GraphQLList(require('./photo_type')),
      resolve(parentValue) {
        return Restaurant.findPhotos(parentValue._id);
      }
    },
    popularDishes: {
      type: new GraphQLList(PopularDishes)
    }
  })
});

module.exports = RestaurantType; 