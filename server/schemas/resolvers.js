const { AuthenticationError } = require("apollo-server-express");
const { User, Record } = require('../models');
const { signToken } = require("../utils/auth");
const resolvers = {
    Query: {
        
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
