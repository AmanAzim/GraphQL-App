const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Author', AuthorSchema);