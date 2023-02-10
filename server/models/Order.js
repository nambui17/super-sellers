const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now,
      },
      records: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Records',
        },
      ],
    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;