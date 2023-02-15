import { gql } from '@apollo/client';

export const QUERY_MANY_RECORDS = gql`
  query records {
    records {
      albumTitle
      artist
      comments
      _id
      imageUrl
      price
      quantity
      totalTracks
    }
  }
`;

export const QUERY_SINGLE_RECORD = gql`
  query Record($id: ID!) {
    record(_id: $id) {
      albumTitle
      _id
      artist
      comments
      dateListed
      imageUrl
      price
      quantity
      spotifyId
      spotifyUri
      totalTracks
    }
  }
`;

export const QUERY_USER = gql`
  query Query {
    user {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($records: [ID]!) {
    checkout(records: $records) {
      session
    }
  }
`;
