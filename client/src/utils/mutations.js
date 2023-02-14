import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login(
$email: String!, 
$password: String!) {
  login(
  email: $email,
   password: $password) {
    token
    user {
      _id
      firstName
      lastName
      email
      password
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser(
$firstName: String!, 
$lastName: String!, 
$email: String!, 
$password: String!) {
  addUser(
  firstName: $firstName, 
  lastName: $lastName, 
  email: $email,
   password: $password) {
    token
    user {
      _id
      firstName
      lastName
      email
      password
    }
  }
}
`

export const ADD_ORDER = gql`
mutation addOrder($records: [ID]!) {
  addOrder(records: $records) {
    _id
    purchaseDate
    records {
      _id
      albumTitle
      artist
      imageUrl
      price
    }
  }
}
`

export const ADD_CART = gql`
mutation addCart($records: [ID]!) {
  addCart(records: $records) {
    _id
    records {
      _id
      albumTitle
      artist
      imageUrl
      price
      quantity
    }
  }
}
`

export const ADD_WISHLIST = gql`
mutation addWishlist($records: [ID]!) {
  addWishlist(records: $records) {
    _id
    records {
        _id
      albumTitle
      artist
      imageUrl
      price
      quantity
    }
  }
}
`

