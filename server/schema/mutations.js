const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLNonNull, GraphQLID } = graphql;

const User = mongoose.model("user");
const UserType = require("./types/user_type");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString }
            },
            resolve(_, args) {
                // return AuthService.verifyUser(args);
                return {}
            }
        }
    }
});


module.exports = mutation;