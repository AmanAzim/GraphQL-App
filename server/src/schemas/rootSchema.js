const { GraphQLSchema } = require('graphql');

const { RootQuery } = require('./rootQuery');
const Mutation = require('./mutation');

const rootSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
 });

module.exports = rootSchema;