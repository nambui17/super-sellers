const { AuthenticationError } = require('apollo-server-express');
const { User, Record, Order } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const stripe = require('stripe')(
  'sk_test_51MbWZzDNwv6WJ9kGKJC98HVjapyLFNScghs3xlxDw75OLuwsboD4LqXUZiqg1Sv1MlkGL54ZkgNtKal7I0i4zDPS00kGLfbTFa'
);

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    records: async (
      parent,
      { artist = '', albumTitle = '', offset, limit, years=[1950, 2023] }
    ) => {
      let recordData;
      if (artist !== '') {
        recordData = await Record.find()
        .skip(offset)
        .limit(limit)
        .where('artist')
        .equals(artist)
      } else if (albumTitle !== '') {
        recordData = await Record.find()
        .skip(offset)
        .limit(limit)
        .where('albumTitle')
        .equals(albumTitle)
      } else if (years !== []) {
        recordData = await Record.find()
          .skip(offset)
          .limit(limit)
          .where('dateListed').equals({
            $gte: years[0],
            $lte: years[1]
          })
      } else {
        recordData = await Record.find()
        .skip(offset)
        .limit(limit)
      }
      return recordData;
    },
    record: async (parent, { _id }) => {
      const singleRecordData = await Record.findById(_id);
      return singleRecordData;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.records',
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      console.log('line 39 url referer header', url);
      const order = new Order({ records: args.records });
      const line_items = [];
      const { records } = await order.populate('records');

      for (let i = 0; i < records.length; i++) {
        const record = await stripe.products.create({
          name: records[i].albumTitle,
          description: records[i].artist,
          images: [`${url}/images/${records[i].imageUrl}`],
        });

        const price = await stripe.prices.create({
          product: record.id,
          unit_amount: records[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    updateRecord: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Record.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    addRecord: async (parent, args) => {
      const newRecord = await Record.create(args);
      return newRecord;
    },

    addWishlist: async (parent, args, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id,
            'savedWishlist': {$ne: args.record._id}
           },
          { $addToSet: { savedWishlist: {...args.record} } },
          { new: true }
        );
        return updateUser;
      }

      throw new AuthenticationError('Not logged in');
    },

    removeWishlist: async (parent, args, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedWishlist: { _id: args._id } } },
          { new: true, runValidators: true, useFindAndModify: false }
        );

        return updateUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addOrder: async (parent, { records }, context) => {
      if (context.user) {
        const order = new Order({ records });

        await User.findByIdAndUpdate(context.user.id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
