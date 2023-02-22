import React from 'react';
import { SimpleGrid, Image, Heading, Text, Button, useToast, Flex } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { REMOVE_WISHLIST } from '../../utils/mutations';

export default function WishlistItem({_id, imageUrl, artist, albumTitle, price, stateChanger}) {
    const [wishlistRemove, {error}] = useMutation(REMOVE_WISHLIST);
    const toast = useToast();
    async function handleDelete() {
        const { data } = await wishlistRemove({
            variables: {
                id: _id
            }
        });
        stateChanger(data.removeWishlist.savedWishlist);
        toast({
            title: 'Bye bye wish!',
            description: 'Record removed from wishlist',
            status: 'error',
            variant: 'subtle',
            duration: 2000,
            isClosable: true,
        })
    }
  return (
    <SimpleGrid columns={{sm:1, md: 3}} textAlign='center' alignItems='center' flexWrap>
      <Image src={imageUrl} />
      <Flex padding={'20px'} marginRight={'20px'} flexDirection='column' flexWrap>
        <Heading>{albumTitle}</Heading>
        <Text>{artist}</Text>
        <Text>${price}</Text>
      </Flex>
      <Button colorScheme={'red'} onClick={handleDelete}><DeleteIcon/></Button>
    </SimpleGrid>
  );
}
