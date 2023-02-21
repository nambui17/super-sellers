import React, {useState, useEffect} from 'react';
import {
  SimpleGrid,
  Box,
  Divider,
  List,
  Center,
  Heading,
  AccordionItem,
  GridItem,
  Spacer,
  ListItem,
  Flex,
  Spinner
} from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';

import '../App.css';
import { QUERY_USER } from '../utils/queries';
import WishlistItem from '../components/WishlistItem';

function Wishlist() {
  const { loading, data, refetch } = useQuery(QUERY_USER);
  const user = data?.user || {};
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    refetch()
    if (data) {
      setWishlist(user.savedWishlist);
    }
  }, [user.savedWishlist, data, refetch]);
  return (
    <Flex height={'100vh'} alignItems="start">
      <SimpleGrid columns={2}>
        <Box>
          {!loading ? <Heading>{user.firstName}'s Wishlist</Heading> : <Spinner/>}
        </Box>
        <List>
          {data ? (user !== undefined ? (
              wishlist.map((wishItem) => (
                <ListItem key={wishItem._id}><WishlistItem 
                imageUrl={wishItem.imageUrl}
                artist={wishItem.artist}
                albumTitle={wishItem.albumTitle}
                price={wishItem.price}
                _id={wishItem._id}
                stateChanger={setWishlist}
                /></ListItem>
              ))
          ) : <></>): (
            <Spinner/>
          )}
        </List>
      </SimpleGrid>
    </Flex>
  );
}

export default Wishlist;
