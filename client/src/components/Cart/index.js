import React, { useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART, CLEAR_CART } from '../../utils/actions';
import {
  GridItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  Button,
  ModalHeader,
  useDisclosure,
  Image,
  Heading,
  Table,
  ButtonGroup,
  TableCaption,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Thead,
  Th,
  Tr,
  Tbody,
} from '@chakra-ui/react';
import cartpic from './image/cart.png';

import CartItem from '../CartItem';
import './style.css';

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe(
  'pk_test_51MbWZzDNwv6WJ9kG24eIHIfg9hlFTUJbGd280dX0b4s5o32BGrgybaD80xmb3eu48yWToGHRg7CFT3vyER7f7XYc00x0hNzg5b'
);

function Cart() {
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
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, records: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

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
  }

  function clearCart() {
    state.cart.forEach((r) => {
      idbPromise('cart', 'delete', { ...r });
    });
    dispatch({ type: CLEAR_CART });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const cancelRef = useRef();
  const { isOpen: alertIsOpen, onOpen: alertOnOpen, onClose: alertOnClose } = useDisclosure();

  return (
    <GridItem className="gridrecord">
      <Image
        className="rwimage"
        src={cartpic}
        alt="Records Cart"
        onClick={onOpen}
      />
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'4xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='4xl'>Cart</ModalHeader>
          <ModalBody>
            <Table>
              {state.cart.length ? (
                <>
                  <TableCaption placement='bottom'>Sub-total: ${calculateTotal()}</TableCaption>
                    <Thead>
                    <Tr>
                      <Th>Record</Th>
                      <Th>Price</Th>
                      <Th isNumeric>Quantity:</Th>
                    </Tr>
                  </Thead>
                </>
              ) : (
                <></>
              )}
              <Tbody>
                {state.cart.length ? (
                      state.cart.map((record) => (
                        <CartItem key={record._id} record={record} />
                      ))
                  ) : (
                    <Heading>No records in your cart</Heading>
                  )}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {Auth.loggedIn() ? (<Button onClick={submitCheckout}>Checkout</Button>): <></>}
              <Button variant="solid" colorScheme={'red'} onClick={alertOnOpen}>
                Clear Cart
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
        <AlertDialog
          isOpen={alertIsOpen}
          leastDestructiveRef={cancelRef}
          onClose={alertOnClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Clear Cart?
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={alertOnClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={() => {
                  clearCart();
                  alertOnClose();
                  onClose();
                }} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Modal>
    </GridItem>
  );
}

export default Cart;
