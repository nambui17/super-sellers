import React, { useState, useEffect } from "react";
import {
  GridItem,
  Grid,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import {
  useMutation,
  useQuery
} from '@apollo/client';
import { QUERY_MANY_RECORDS } from "../utils/queries";
import FilterBar from "../components/FilterBar";

import Record from "../components/Record";
import '../App.css'

function Merchandise() {
  const {loading, data} = useQuery(QUERY_MANY_RECORDS);

  const records = data?.records || [];

  return (
    <Grid
      h="100vw"
      templateRows="repeat(4,1fr)"
      templateColumns="repeat(10,1fr)"
      gap={3}
    >
      <GridItem rowSpan={4} colSpan={2}>
        <FilterBar />
      </GridItem>
      <GridItem rowSpan={4} colSpan={8}>
        <SimpleGrid
            columns={{sm:1, md: 2, lg: 4}}
        >
          {loading ? <Spinner/> : records.map((record) => (
          <Record
            id={record.id}
            image={record.imageUrl}
            title={record.albumTitle}
            artist={record.artist}
            comments={record.comments}
            quantity={record.quantity}
            price={`${record.price}`}
          />))}
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
}

export default Merchandise;
