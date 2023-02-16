import React, { useState, useEffect } from "react";
import {
  GridItem,
  Grid,
} from "@chakra-ui/react";

import FilterBar from "../components/FilterBar";
import RecordList from '../components/RecordList';



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
      <RecordList/>
    </Grid>
  );
}

export default Merchandise;
