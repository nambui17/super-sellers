import React from 'react';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Button
} from '@chakra-ui/react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import Cart from '../Cart';
import './style.css';

function Navbar() {
  return (
    <Box className="navContainer">
      <Center className="headerBox">
        <Heading className="heading">New Age Records</Heading>
      </Center>
      <Grid
        display={{ lg: 'flex' }}
        templateColumns="repeat(15, 1fr)"
        className="navBox"
        gap={5}
      >
        <GridItem colStart={1} colEnd={2} className="gridItem">
          <Link to="/" className="navItem">
            Home
          </Link>
        </GridItem>
        <GridItem colStart={2} colEnd={4} className="gridItem">
          <Link to="/merch" className="navItem">
            Merchandise
          </Link>
        </GridItem>
        <GridItem colStart={4} colEnd={6} className="gridItem">
          <Link to="/about" className="navItem">
            About Us
          </Link>
        </GridItem>
        <GridItem colStart={6} colEnd={8} className="gridItem">
          <Link to="/contact" className="navItem">
            Contact Us
          </Link>
        </GridItem>
        <Spacer />
        {Auth.loggedIn() ? (
          <GridItem colStart={12} colEnd={13} className="gridItem">
            <Link className="navItem" to="/wishlist">
              Wishlist
            </Link>
          </GridItem>
        ) : (
          <></>
        )}
        <GridItem
          colStart={14}
          colEnd={15}
          className="gridItem"
        >
          <Link to='/signup' className="navItem">
            Sign Up
          </Link>
        </GridItem>
        {Auth.loggedIn() ? (
          <GridItem colStart={13} colEnd={14} className="gridItem">
            <Button variant='ghost' colorScheme={'green'} onClick={Auth.logout}>Log Out</Button>
          </GridItem>
        ) : (
          <GridItem colStart={13} colEnd={14} className="gridItem">
            <Link className="navItem" to="/login">
              Login
            </Link>
          </GridItem>
        )}
        <Cart />
      </Grid>
    </Box>
  );
}

export default Navbar;
