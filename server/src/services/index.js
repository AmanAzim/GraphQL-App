const BookSchema = require('../models/book');
const AuthorSchema = require('../models/author');

const dbServices = {
    async addAuthor({ id, name, age }) {
        const author = new AuthorSchema({ id, name, age });
        return author.save();
    },
    async addBook({ id, name, genre, authorId }) {
        const book = new BookSchema({ id, name, genre, authorId });
        return book.save();
    },
    async findBookByParam(param) {
        return BookSchema.findOne(param);
    },
    async findBooksByAuthorId(id) {
        return BookSchema.find({ authorId: id });
    },
    async findAuthorByParam(param) {
        return AuthorSchema.findOne(param);
    },
    async findAllBooks() {
        return BookSchema.find();
    },
    async findAllAuthors() {
        return AuthorSchema.find();
    },
}

module.exports = dbServices;