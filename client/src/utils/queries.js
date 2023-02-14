import { gql } from '@apollo/client';

export const QUERY_SINGLE_RECORD = gql`
  query Record($id: ID!) {
    record(_id: $id) {
      albumTitle
      artist
      comments
      dateListed
      imageUrl
      price
      quantity
      spotifyId
      spotifyUri
      totalTracks
      _id
    }
  }
`;

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
