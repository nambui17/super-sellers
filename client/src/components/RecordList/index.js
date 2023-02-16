import React, { useState, useEffect } from 'react';
import {
  GridItem,
  Grid,
  SimpleGrid,
  Spinner,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import {
    ArrowBackIcon,
    ArrowForwardIcon
} from '@chakra-ui/icons'
import Record from '../Record';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MANY_RECORDS } from '../../utils/queries';


export default function RecordList() {
  const { loading, data } = useQuery(QUERY_MANY_RECORDS);
  const [pageIndex, setPageIndex] = useState(0);
  const records = data?.records || [];
  let recordChunks = [];
  let pages = [];
  if (!loading) {
    for (let i = 0; i < records.length; i += 8) {
      const chunk = records.slice(i, i + 8);
      recordChunks.push(chunk);
      pages.push(i / 8 + 1);
    }
  }
  const handleBackClick = () => {
    if (pageIndex !== 0) {
        setPageIndex(pageIndex-1);
    }
  }
  const handleForwardClick = () => {
    if (pageIndex !== pages[pages.length-1]) {
        setPageIndex(pageIndex+1);
    }
  }
  return (
    <>
      <GridItem rowSpan={2.3} colSpan={8}>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }}>
          {loading ? (
            <Spinner />
          ) : (
            recordChunks[pageIndex].map((record) => (
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
      <GridItem rowSpan={1} colSpan={8}>
      <ButtonGroup>
        <Button onClick={handleBackClick} variant={'solid'}><ArrowBackIcon/></Button>
        {pages.map((page) => (
          <Button key={page} variant={'outline'} color="gray.800" id={page}>
            {page}
          </Button>
        ))}
        <Button onClick={handleForwardClick} variant={'solid'}><ArrowForwardIcon/></Button>
      </ButtonGroup>
      </GridItem>
    </>
  );
}
