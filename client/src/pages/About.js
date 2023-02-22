import React from 'react';
import { Heading, Box, Text } from '@chakra-ui/react';

import '../App.css';

function About() {
  return (
    <Box className="background" margin={'0 25px 0 25px'} borderRadius={'lg'} boxSize={{sm: '100%', md: '100%'}}>
      <Box className="about-title">
        <Heading
          fontSize={{ sm: '24px', md: '6xl' }}
          className="about"
          marginLeft={'45px'}
        >
          About Us
        </Heading>
        <Text fontSize={{sm: '16px', md: '4xl'}} className="story" textAlign={'left'}>
          We started selling records because records are our passion. We hope to
          share our love of records to everyone in the world. This website was
          created for a quick and simple way for everyone to purchase records in
          a new and safe way.
        </Text>
      </Box>
    </Box>
  );
}

export default About;
