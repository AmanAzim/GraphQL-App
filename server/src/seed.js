const BookSchema = require('./models/book');
const AuthorSchema = require('./models/author');

const authors = [
    { id: 1, name: 'Patrick Rothfuss', age: 44 },
    { id: 2, name: 'Brandon Sanderson', age: 42 },
    { id: 3, name: 'Terry Pratchett', age: 66 }
];

const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: 1, authorId: 1 },
    { name: 'The Final Empire', genre: 'Fantasy', id: 2, authorId: 2 },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: 3, authorId: 3 },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: 3, authorId: 3 },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: 5, authorId: 3 },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: 6, authorId: 3 },
];

async function seedDb() {
    try {
        const existingBookCount = await BookSchema.count();
        const existingAuthorCount = await AuthorSchema.count();

        if (existingBookCount < 1) {
            await BookSchema.insertMany(books);
            return;
        }

        if (existingAuthorCount < 1) {
            await AuthorSchema.insertMany(authors);
            return;
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = { seedDb };