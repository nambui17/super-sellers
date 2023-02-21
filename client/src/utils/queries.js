import { gql } from '@apollo/client';

export const QUERY_MANY_RECORDS = gql`
  query Records(
    $offset: Int
    $albumTitle: String
    $artist: String
    $limit: Int
    $years: [Int]
  ) {
    records(
      offset: $offset
      albumTitle: $albumTitle
      artist: $artist
      limit: $limit
      years: $years
    ) {
      _id
      albumTitle
      artist
      comments
      dateListed
      price
      imageUrl
      quantity
      spotifyId
      spotifyUri
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
    firstName
    lastName
    email
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($records: [ID]!) {
    checkout(records: $records) {
      session
    }
  }
`;
