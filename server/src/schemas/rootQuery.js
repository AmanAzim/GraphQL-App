const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = require('graphql');

const dbServices = require('../services');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ // we use call back instead of Object in cases where we have sircular dependency like author and book so that no matter where they are written in the js file they can be read when the callback is called but if we hads object it had to be defined in time of the file loads not in times of the relation is called in conjunction which will give error
        id: { type: GraphQLID },
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType, // joining relation 
            resolve(parent, args) {
                const { authorId } = parent; // all property of a book / parent
                return dbServices.findAuthorByParam({ id: authorId });
            }
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: { 
            type: new GraphQLList(BookType), // books[]
            resolve(parent, args) {
                const { id } = parent; // all property of a author / parent
                return dbServices.findBooksByAuthorId(id);
            }
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { // has to match the name of the query made from front-end
            type: BookType,
            args: {
                id: { type: GraphQLID } // Means when FE query about book then arouments are expected which is: id of the book // book(id: 123) {}
            },
            resolve(parent, args) { // This is the function where the code to get the data from DB or other source is written
                // args has the access to the passed args above like id
                // parent is used for defining relationship of returned data
                const { id } = args;
                return dbServices.findBookByParam({ id: id });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) { 
                const { id } = args;
                return dbServices.findAuthorByParam({ id: id });
            }
        },
        books: {
            type: new GraphQLList(BookType), // all books[]
            resolve(parent, args) {
                return dbServices.findAllBooks();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType), // all authors[]
            resolve(parent, args) {
                return dbServices.findAllAuthors();
            }
        }
    },
});

module.exports = { RootQuery, BookType, AuthorType };