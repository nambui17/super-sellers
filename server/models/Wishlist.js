const { Schema } = require('mongoose');

const wishlistSchema = new Schema({
  artist: {
    type: String,
    required: true,
  },
  albumTitle: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
  
});

module.exports = wishlistSchema;
