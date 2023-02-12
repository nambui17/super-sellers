const { AuthenticationError } = require("apollo-server-express");
const { User, Record, Cart, Order, Wishlist } = require('../models');
const { signToken } = require("../utils/auth");
const resolvers = {
    Query: {
      records: async () => Record.find(),
      records: async (parent, { category, name }) => {
        const params = {};
  
        if (category) {
          params.category = category;
        }
  
        if (name) {
          params.name = {
            $regex: name,
          };
        }
  
        return Record.find(params).populate('category');
      },
      user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user.id).populate({
            path: 'orders.records',
            populate: 'category',
          });
  
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return user;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      order: async (parent, { id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user.id).populate({
            path: 'orders.records',
            populate: 'category',
          });
  
          return user.orders.id(id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      wishList: async (parent, { id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user.id).populate({
            path: 'wishList.records',
            populate: 'category',
          });
  
          return user.WishList.id(id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      cart: async (parent, { id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user.id).populate({
            path: 'cart.records',
            populate: 'category',
          });
  
          return user.Cart.id(id);
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
      updateRecord: async (parent, { id, quantity }) => {
        const decrement = Math.abs(quantity) * -1;
  
        return Record.findByIdAndUpdate(
          id,
          { $inc: { quantity: decrement } },
          { new: true }
        );
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
    
        }
};
module.exports = resolvers;