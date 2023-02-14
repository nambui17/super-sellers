const {Schema, model} = require('mongoose');

const recordSchema = new Schema({
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
  dateListed: {
    type: String,
  },
  totalTracks: {
    type: Number,
  },
  comments: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  spotifyId: {
    type: String,
    required: true,
  },
  spotifyUri: {
    type: String,
    required: true,
  }
});

const Record = model('Record', recordSchema);

module.exports = Record;
