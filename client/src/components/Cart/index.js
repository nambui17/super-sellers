import React, { useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import {
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  Button,
  ModalHeader,
  useDisclosure,
  Image,
  Heading,
  Box,
} from '@chakra-ui/react';
import cartpic from './image/cart.png';

import CartItem from '../CartItem';
import './style.css';

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe(
  'pk_test_51MbWZzDNwv6WJ9kG24eIHIfg9hlFTUJbGd280dX0b4s5o32BGrgybaD80xmb3eu48yWToGHRg7CFT3vyER7f7XYc00x0hNzg5b'
);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // populate the cart with records
  // useEffect(() => {
  //   async function getCart() {
  //     const cart = await idbPromise('cart', 'get');
  //     dispatch({ type: ADD_MULTIPLE_TO_CART, records: [...cart] });
  //   }

  //   if (!state.cart.length) {
  //     getCart();
  //   }
  // }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((record) => {
      sum += record.price * record.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const recordIds = [];

    state.cart.forEach((record) => {
      for (let i = 0; i < record.purchaseQuantity; i++) {
        recordIds.push(record._id);
      }
    });

    getCheckout({
      variables: { records: recordIds },
    });
    console.log(recordIds)
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <GridItem className="gridrecord">
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
            {state.cart.length ? (
              <Box>
                {state.cart.map((record) => (
                  <CartItem key={record._id} record={record} />
                ))}
              </Box>
            ) : (
              <Heading>Log in to check out</Heading>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={submitCheckout}>Checkout</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </GridItem>
  );
};

export default Cart;