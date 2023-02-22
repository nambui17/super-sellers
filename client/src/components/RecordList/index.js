import React from 'react';
import {
  GridItem,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import Record from '../Record';
import { useQuery } from '@apollo/client';
import { QUERY_MANY_RECORDS } from '../../utils/queries';

export default function RecordList({ offset, artist, albumTitle }) {
  const { loading, data } = useQuery(QUERY_MANY_RECORDS, {
    variables: { 
      offset: (offset-1)*8,
      limit: 8,
      artist: artist,
      albumTitle: albumTitle
     },
  });
  const records = data?.records || [];
  return (
    <GridItem rowSpan={2.3} colSpan={9}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }}>
        {loading ? (
          <Spinner />
        ) : (
          records.map((record) => (
            <Record
              key={record._id}
              id={record._id}
              image={record.imageUrl}
              title={record.albumTitle}
              artist={record.artist}
              comments={record.comments}
              quantity={record.quantity}
              price={`${record.price}`}
            />
          ))
        )}
      </SimpleGrid>
    </GridItem>
  );
}
