import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
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
`;

export const ADD_WISHLIST = gql`
  mutation AddWishlist($record: RecordInput!) {
    addWishlist(record: $record) {
      savedWishlist {
        _id
        artist
        albumTitle
        imageUrl
        price
        quantity
      }
    }
  }
`;

export const REMOVE_WISHLIST = gql`
  mutation RemoveWishlist($id: ID!) {
    removeWishlist(_id: $id) {
      savedWishlist {
        _id
        artist
        albumTitle
        price
        quantity
        imageUrl
      }
    }
  }
`;
