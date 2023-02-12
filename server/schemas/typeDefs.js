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
    price: Float
    dateListed: String
    comments: String
    mediaCondition: String
    sleeveCondition: String
    quantity: Int
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type Order {
    _id: ID
    purchaseDate: String
    records: [Record]
  }
  type Cart {
    _id: ID
    records: [Record]
  }
  type Wishlist {
    _id: ID
    records: [Record]
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    user: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(records: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateRecord(_id: ID!, quantity: Int!): Record
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
