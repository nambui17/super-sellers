import React from 'react';
import { Image, Box } from '@chakra-ui/react'







function Wishlist() {

    return (
        <div>
<Box boxSize='sm'>
  <Image src='\assets\images\pexels-elviss-railijs-bitāns-1389429.jpg' alt='Records Cart' />
  <div className='rtitle'>Record Title</div>
  <div className='rprice'>Record Price</div>
</Box>

        </div>
    )
}

export default Wishlist;