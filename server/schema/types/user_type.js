const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;

// Creating GraphQL object type for user
const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    zipCode: { type: GraphQLInt },
    birithday: {
      month: { type: GraphQLString },
      day: { type: GraphQLInt },
      yr: { type: GraphQLInt }
    }
  })
})

module.exports = UserType;