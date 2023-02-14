const { AuthenticationError } = require("apollo-server-express");
const { User, Record, Order } = require('../models');
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
      console.log(recordData);
      return recordData;
    },
    record: async (parent, { _id }) => {
      const singleRecordData = await Record.findById(_id);
      return singleRecordData;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.records'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
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

      return await Record.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },

    addRecord: async (parent, args) => {
      const newRecord = await Record.create(args);
      return newRecord;
    },

    addWishlist: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const updateUser =  await User.findByIdAndUpdate(
          { _id: context.user.id }, 
          {$push: { savedWishlist: args._id } },
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
  },
};

module.exports = resolvers;