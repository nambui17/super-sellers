import React from 'react';
import { Image, Box, SimpleGrid, List, ListItem, Divider } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';

import '../App.css';

function Wishlist() {
  return (
    <Box height={'100vh'}>
      <SimpleGrid>
        <List>
          <ListItem>
            
          </ListItem>
        </List>
        <Divider orientation='vertical'/>
      </SimpleGrid>
    </Box>
  );
}

export default Wishlist;
