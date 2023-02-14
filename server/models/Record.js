const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({
  artist: {
    type: String,
    required: true,
  },
  albumTitle: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  catNo: {
    type: String,
  },
  format: {
    type: String,
  },
  status: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  dateListed: {
    type: String,
  },
  comments: {
    type: String,
  },
  mediaCondition: {
    type: String,
  },
  sleeveCondition: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
