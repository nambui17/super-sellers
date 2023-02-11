const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: "Records",
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
