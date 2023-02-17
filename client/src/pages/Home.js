import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';


export default function Home() {
  return (
    <Box>
      <Grid gridTemplateColumns="repeat(5,1fr)" autoRows>
        <GridItem colSpan={2}>
          <Container>
            <Heading>Bring the Music to Life with Every Spin!</Heading>
            <Text>
              Welcome to New Age Records, your destination for the finest
              collection of records and vinyls. At New Age Records, we believe
              that music is an integral part of our lives and has the power to
              evoke emotions, memories, and feelings. That's why we've brought
              together a wide range of vinyl records that cater to different
              genres and tastes. Whether you're a classic rock fan, a jazz
              aficionado, or a lover of modern pop, you'll find something to add
              to your collection at New Age Records. With our carefully curated
              collection and commitment to delivering only the best quality
              products, we aim to be your go-to destination for all things
              vinyl.
            </Text>
          </Container>
        </GridItem>
        <GridItem colSpan={2}>
          <Image
            src="/assets/images/pexels-record.jpg"
            alt="Spinning record"
            borderRadius={'lg'}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
