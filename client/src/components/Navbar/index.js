import React from "react";
import { Flex, Box, Center, Grid, GridItem, Spacer, Heading } from "@chakra-ui/react";
import './style.css';

function Navbar() {
  return (
    <Box className="navContainer">
      <Center className="headerBox">
        <Heading className="heading">New Age Records</Heading>
      </Center>
      <Grid templateColumns='repeat(15, 1fr)' className="navLinks">
        <GridItem colStart={1} colEnd={3}>Home</GridItem>
        <GridItem colStart={3} colEnd={5}>Merchandise</GridItem>
        <GridItem colStart={5} colEnd={7}>Vintage Records</GridItem>
        <GridItem colStart={7} colEnd={9}>About Us</GridItem>
        <GridItem colStart={9} colEnd={11}>Contact Us</GridItem>
      </Grid>
    </Box>
  );
}

export default Navbar;
