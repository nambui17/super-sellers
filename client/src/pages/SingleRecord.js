import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_RECORDS,
} from '../utils/actions';
import { QUERY_SINGLE_RECORD } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import {
  Spinner,
  Box,
  useToast,
  Image,
  Heading,
  CardBody,
} from '@chakra-ui/react';
import Record from '../components/Record';

export default function SingleRecord() {
  const [state, dispatch] = useStoreContext();
  const { recordId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_RECORD, {
    variables: { id: recordId },
  });
  const { cart } = state;
  const toast = useToast();

  const record = data?.record || {};

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === recordId);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: recordId,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      toast({
        title: 'Record Quantity Updated',
        description: 'Record Quantity Increased in Cart',
        status: 'success',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        record: { ...record, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...record, purchaseQuantity: 1 });
      toast({
        title: 'Record Added',
        description: 'Record Added to Cart!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: record._id,
    });
    idbPromise('cart', 'delete', { ...record });
  };

  return (
    <Box>
      <Record
        key={record._id}
        id={record._id}
        image={record.imageUrl}
        title={record.albumTitle}
        artist={record.artist}
        comments={record.comments}
        quantity={record.quantity}
        price={`${record.price}`}
      />
    </Box>
  );
}
