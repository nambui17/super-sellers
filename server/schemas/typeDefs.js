const { gql } = require("apollo-server-express");

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
    records(artist: String, albumTitle: String): [Record]
    record(_id: ID!): Record

  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    addOrder(
    records: [ID]!
    ): Order
    
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User

    updateRecord(
    _id: ID!
     quantity: Int!
     ): Record

    login(
    email: String!
    password: String!
    ): Auth

    addRecord(
    artist: String!
    albumTitle: String!
    price: Float!
    status: String
    ): Record

    #make updateWishlist instead of addWishlist
    addWishlist(
    records: [ID]!
    ): Wishlist

    addCart(
    records: [ID]!
    ): Cart
  
  }
`;

module.exports = typeDefs;
