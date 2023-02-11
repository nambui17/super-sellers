const mongoose = require("mongoose");

const { Schema } = mongoose;

const wishListSchema = new Schema({
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: "Records",
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishListSchema);

module.exports = Wishlist;
