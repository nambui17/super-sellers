const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Record {
    _id: ID
    artist: String
    albumTitle: String
    label: String
    catNo: String
    format: String
    status: String
    price: Number
    dateListed: String
    comments: String
    mediaCondition: String
    sleeveCondition: String
    quantity: Number
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type Auth {
    token: ID
    user: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
