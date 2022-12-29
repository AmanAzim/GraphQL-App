const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID } = require('graphql');

const { BookType, AuthorType } = require('./rootQuery');
const dbServices = require('../services');

// Mutations: defines any possible add/delete/update operation on data
const Mutation = new GraphQLObjectType({ 
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { id: { type: GraphQLInt }, name: { type: new GraphQLNonNull(GraphQLString) }, age: { type: new GraphQLNonNull(GraphQLInt) } },
            resolve(parent, args) {
                const { id, name, age } = args;
                return dbServices.addAuthor({ id, name, age });
            }
        },
        addBook: {
            type: BookType,
            args: { id: { type: GraphQLInt }, name: { type: new GraphQLNonNull(GraphQLString) }, genre: { type: new GraphQLNonNull(GraphQLString)}, authorId: { type: GraphQLID } },
            resolve(parent, args) {
                const { id, name, genre, authorId } = args;
                return dbServices.addBook({ id, name, genre, authorId });
            }
        }
    }
 });

 module.exports = Mutation;