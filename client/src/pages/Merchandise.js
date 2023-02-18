import React, { useState, useEffect } from 'react';
import {
  GridItem,
  Grid,
  ButtonGroup,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { QUERY_MANY_RECORDS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import FilterBar from '../components/FilterBar';
import RecordList from '../components/RecordList';

function Merchandise() {
  const [page, setPage] = useState(1);
  const { loading, data } = useQuery(QUERY_MANY_RECORDS);
  const records = data?.records || [];
  let pages = [];
  if (!loading) {
    for (let i = 0; i < records.length; i += 8) {
      pages.push(i / 8 + 1);
    }
  }
  const handlePageClick = (p) => {
    setPage(p.target.value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleForwardClick = () => {
    if (parseInt(page) !== pages.length) {
      setPage(parseInt(page)+1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };
  const handleBackClick = () => {
    if (parseInt(page) !== 1) {
      setPage(parseInt(page) - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };
  return (
      <Grid
        h="100vw"
        templateRows="repeat(4,1fr)"
        templateColumns="repeat(10,1fr)"
        gap={3}
      >
        <GridItem rowSpan={4} colSpan={1}>
          <FilterBar />
        </GridItem>
        <RecordList offset={page} />
        <ButtonGroup>
          <Button variant={'solid'} onClick={handleBackClick}>
            <ArrowBackIcon />
          </Button>
          {loading ? (
            <Spinner />
          ) : (
            pages.map((p) => (
              <Button
                key={p}
                variant="outline"
                onClick={handlePageClick}
                value={p}
              >
                {p}
              </Button>
            ))
          )}
          <Button variant={'solid'} onClick={handleForwardClick}>
            <ArrowForwardIcon />
          </Button>
        </ButtonGroup>
      </Grid>
  );
}

export default Merchandise;
