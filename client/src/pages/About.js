import React from "react";
import { Heading, Box, Text } from "@chakra-ui/react";

import "../App.css";


function About() {
 
  return (
    <Box className="background">
    
    <Box className="about-title">
        <Heading fontSize='6xl' className="about">About Us</Heading>
        <Text fontSize='4xl' className="story">
          We started selling records because records are our passion. We hope to share our love of records to everyone in the world. This website was created for a quick and simple way for everyone to purchase records in a new and safe way.
        </Text>
    </Box>
        
    </Box>
  );
}

export default About;
