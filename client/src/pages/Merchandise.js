import React from "react";
import {
  GridItem,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import FilterBar from "../components/FilterBar";

import Record from "../components/Record";
import '../App.css'

function Merchandise() {
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
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
          <Record />
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
}

export default Merchandise;
