import React, { useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { GridItem, Modal, ModalBody, ModalCloseButton, ModalFooter, ModalOverlay, ModalContent, Button, ModalHeader, useDisclosure, Image } from '@chakra-ui/react';
import cartpic from './image/recordcart.png'
import './style.css';

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_51MbWZzDNwv6WJ9kG24eIHIfg9hlFTUJbGd280dX0b4s5o32BGrgybaD80xmb3eu48yWToGHRg7CFT3vyER7f7XYc00x0hNzg5b');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <GridItem className="gridItem">
      <Image
        className="rwimage"
        src={cartpic}
        alt="Records Cart"
        onClick={onOpen}
      />
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cart</ModalHeader>
          <ModalBody>
            <h1> Something </h1>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </GridItem>
  );
};

export default Cart;
