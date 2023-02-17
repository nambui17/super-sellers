import React, { useRef } from "react";
import { Box, Center, Grid, GridItem, Heading, Spacer, Image, Modal, useDisclosure, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, ModalContent} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Cart from '../Cart';
import "./style.css";

function Navbar() {
  const navItems = [
    {
      title: "Home",
      colStart: 1,
      colEnd: 2,
      link: "/",
    },
    {
      title: "Merchandise",
      colStart: 2,
      colEnd: 4,
      link: "/merch",
    },
    {
      title: "About Us",
      colStart: 4,
      colEnd: 6,
      link: "/about",
    },
    {
      title: "Contact Us",
      colStart: 6,
      colEnd: 8,
      link: "/contact",
    },
  ];
  const loginItems = [
    {
      title: "Spotify",
      colStart: 11,
      colEnd: 12,
      link: "http://localhost:3001/auth/login",
    },
    {
      title: "Wishlist",
      colStart: 12,
      colEnd: 13,
      link: "/wishlist",
    },
    {
      title: "Login",
      colStart: 13,
      colEnd: 14,
      link: "/login",
    },
    {
      title: "Sign Up",
      colStart: 14,
      colEnd: 15,
      link: "/signup",
    },
  ];

  return (
    <Box className="navContainer">
      <Center className="headerBox">
        <Heading className="heading">New Age Records</Heading>
      </Center>
      <Grid templateColumns="repeat(15, 1fr)" className="navBox">
        {navItems.map((item) => (
          <GridItem
            colStart={item.colStart}
            colEnd={item.colEnd}
            className="gridItem"
            key={item.title}
          >
            <Link to={item.link} className="navItem">
              {item.title}
            </Link>
          </GridItem>
        ))}
        <Spacer />
        {loginItems.map((item) => (
          <GridItem
            colStart={item.colStart}
            colEnd={item.colEnd}
            className="gridItem"
            key={item.title}
          >
            <Link to={item.link} className="navItem">
              {item.title}
            </Link>
          </GridItem>
        ))}
        <Cart/>
      </Grid>
    </Box>
  );
}

export default Navbar;
