const { AuthenticationError } = require("apollo-server-express");
const { User, Record } = require('../models');
const { signToken } = require("../utils/auth");
const resolvers = {};
