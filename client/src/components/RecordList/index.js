import React, { useState, useEffect } from 'react';
import {
  GridItem,
  Grid,
  SimpleGrid,
  Spinner,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Record from '../Record';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MANY_RECORDS } from '../../utils/queries';

export default function RecordList({ offset }) {
  const { loading, data } = useQuery(QUERY_MANY_RECORDS, {
    variables: { 
      offset: (offset-1)*8,
      limit: 8
     },
  });
  const records = data?.records || [];
  return (
    <GridItem rowSpan={2.3} colSpan={8}>
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
