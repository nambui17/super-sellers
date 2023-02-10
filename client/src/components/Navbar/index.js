import React from "react";
import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import './style.css';

function Navbar() {
  return (
    <Box className="navContainer">
      <Center className="headerBox">
        <Heading className="heading">New Age Records</Heading>
      </Center>
      <Grid templateColumns='repeat(15, 1fr)' className="navBox">
        <GridItem colStart={1} colEnd={2} className="gridItem">
          <Link to="/" className="navItem">Home</Link>
        </GridItem>
        <GridItem colStart={2} colEnd={4} className="gridItem">
        <Link to="/" className="navItem">Merchandise</Link>
          </GridItem>
        <GridItem colStart={4} colEnd={6} className="gridItem">
        <Link to="/" className="navItem">Vintage Records</Link>
          </GridItem>
        <GridItem colStart={6} colEnd={8} className="gridItem">
        <Link to="/" className="navItem">About Us</Link>
        </GridItem>
        <GridItem colStart={8} colEnd={10} className="gridItem">
        <Link to="/" className="navItem">Contact Us</Link>
        </GridItem>
        <GridItem colStart={12} colEnd={13} className="gridItem">
        <Link to="/" className="navItem">Wishlist</Link>
        </GridItem>
        <GridItem colStart={13} colEnd={14} className="gridItem">
        <Link to="/" className="navItem">Login</Link>
        </GridItem>
        <GridItem colStart={14} colEnd={15} className="gridItem">
        <Link to="/" className="navItem">Sign Up</Link>
        </GridItem>
        <GridItem className="gridItem">
        <Link to="/" className="navItem">"Image Here"</Link>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Navbar;
