const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  authorId: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Book', BookSchema);