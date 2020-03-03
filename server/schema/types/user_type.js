<<<<<<< HEAD
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;

// Creating GraphQL object type for sub fields of data
const Birthday = new GraphQLObjectType({
  name: 'Birthday',
  fields: () => ({
    month: { type: GraphQLString },
    day: { type: GraphQLInt },
    yr: { type: GraphQLInt }
  }),
});

// Creating GraphQL object type for user
const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    zipCode: { type: GraphQLInt },
    birthday: { type: Birthday }
  })
})
=======
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    zipCode: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    errors: { type: new GraphQLList(GraphQLString) }
  })
});
>>>>>>> master

module.exports = UserType;