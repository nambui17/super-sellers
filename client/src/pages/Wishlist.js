import React from 'react';
import { Image, Box } from '@chakra-ui/react'
import "../App.css";






function Wishlist() {

    return (
      
<div >
  <h3 className='wluser'>Username</h3>
  <div className='wishlistbox'>
<Box boxSize='300'>
  <Image className='rwimage' src='\assets\images\pexels-elviss-railijs-bitāns-1389429.jpg' alt='Records Cart' />
  <div className='rwtitle'>Record Title</div>
  <div className='rwprice'>Record Price</div>
  <div className='rwdescription'>Description</div>
<button className='atc'>Add to Cart</button>
</Box>
</div>
</div>
      
    )
}

export default Wishlist;