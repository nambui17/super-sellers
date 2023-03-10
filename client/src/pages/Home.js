import React from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  extendTheme
} from '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';
import '../App.css';
const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
}
const theme = extendTheme({ breakpoints })
export default function Home() {
  const AnimatedImage = animated(Image);
  const prop = useSpring({
    from: { x: 300, opacity: 0, rotate: 0 },
    to: { x: 0, opacity: 1, rotate: 360 },
    config: {
      mass: 5,
      tension: 50,
    },
  });
  return (
    <Box height={'100vh'}>
  
      <Grid display={{md: 'flex'}}  gridTemplateColumns="repeat(5,1fr)" autoRows marginLeft={'50px'}>
        
          <GridItem colSpan={2}>
            <Container marginRight={'50px'}>
              <Heading className="slogan">
                Bring the Music to Life with Every Spin!
              </Heading>
              <Text>
                Welcome to New Age Records, your destination for the finest
                collection of records and vinyls. At New Age Records, we believe
                that music is an integral part of our lives and has the power to
                evoke emotions, memories, and feelings. That's why we've brought
                together a wide range of vinyl records that cater to different
                genres and tastes. Whether you're a classic rock fan, a jazz
                aficionado, or a lover of modern pop, you'll find something to
                add to your collection at New Age Records. With our carefully
                curated collection and commitment to delivering only the best
                quality products, we aim to be your go-to destination for all
                things vinyl.
              </Text>
            </Container>
          </GridItem>
          <GridItem colSpan={2}>
            <AnimatedImage
              className="media"
              src="/assets/images/pexels-record.jpg"
              alt="Spinning record"
              borderRadius={'lg'}
              style={prop}
              fit='contain'
            />
          </GridItem>
     
      </Grid>
      </Box>
  );
}
