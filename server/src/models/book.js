const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: {
    type: Number,
    required: true,
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