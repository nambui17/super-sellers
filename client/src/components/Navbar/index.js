import React, { useRef } from "react";
import { Box, Center, Grid, GridItem, Heading, Spacer, Image, Modal, useDisclosure, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, ModalContent} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import cartpic from "./image/recordcart.png"
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

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
        <GridItem className="gridItem">
          <Image className='rwimage' src={cartpic} alt='Records Cart' onClick={onOpen}/>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
              <ModalHeader>Cart</ModalHeader>
              <ModalBody>
                <h1> Something </h1>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Navbar;
