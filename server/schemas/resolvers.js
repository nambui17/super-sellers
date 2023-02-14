const { AuthenticationError } = require("apollo-server-express");
const { User, Record, Cart, Order, Wishlist } = require('../models');
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
        console.log(userData);
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    records: async (parent, args) => {
      const recordData = await Record.find();
      return recordData;
    },
    record: async (parent, {_id}) => {
      const singleRecordData = await Record.findById(_id);
      return singleRecordData;
    }
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

    addRecord: async (parent, args) => {
      const newRecord = await Record.create(args);
      return newRecord;
    },

    addWishlist: async (parent, { records }, context) => {
      console.log(context);
      if (context.user) {
        const wishList = new Wishlist({ records });

        await User.findByIdAndUpdate(context.user.id, {
          $push: { wishLists: wishList },
        });

        return wishList;
      }

      throw new AuthenticationError('Not logged in');
    },

    addOrder: async (parent, { records }, context) => {
      console.log(context);
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

    addCart: async (parent, { records }, context) => {
      console.log(context);
      if (context.user) {
        const cart = new Cart({ records });

        await User.findByIdAndUpdate(context.user.id, {
          $push: { carts: cart },
        });

        return cart;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;