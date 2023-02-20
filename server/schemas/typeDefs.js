const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Record {
    _id: ID
    artist: String
    albumTitle: String
    imageUrl: String
    price: Float
    dateListed: String
    totalTracks: Int
    comments: String
    quantity: Int
    spotifyId: String
    spotifyUri: String
  }

  type WishlistItem {
    _id: ID
    artist: String
    albumTitle: String
    price: Float
    quantity: Int
    imageUrl: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    savedWishlist: [WishlistItem]
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

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }
  
  input RecordInput {
    _id: ID
    artist: String
    albumTitle: String
    imageUrl: String
    price: Float
    quantity: Int
  }

  type Query {
    user: User
    records(
      artist: String
      albumTitle: String
      offset: Int
      limit: Int,
      years: [Int]
    ): [Record]
    record(_id: ID!): Record
    order(_id: ID!): Order
    checkout(records: [ID]!): Checkout
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

    addRecord(
      artist: String!
      albumTitle: String!
      price: Float!
      status: String
    ): Record

    addWishlist(record: RecordInput!): User
    removeWishlist(_id: ID!): User
  }
`;

module.exports = typeDefs;
