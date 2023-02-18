import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import {
  Box,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { idbPromise } from '../../utils/helpers';

export default function CartItem({ record, price }) {
  const [state, dispatch] = useStoreContext();
  const removeFromCart = (record) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: record._id,
    });
    idbPromise('cart', 'delete', { ...record });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: record._id,
      });
      idbPromise('cart', 'delete', { ...record });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: record._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise('cart', 'put', {
        ...record,
        purchaseQuantity: parseInt(value),
      });
    }
  };
  console.log(record.purchaseQuantity);
  return (
    <>
      <GridItem colStart={1} colEnd={7}>
        <Image src={record.image}></Image>
      </GridItem>
      <GridItem colStart={7} colEnd={9}>
        <p>Cost: ${record.price}</p>
      </GridItem>
      <GridItem colStart={1} colEnd={13}>
        <InputGroup size="md">
          <Input value={record.purchaseQuantity} />
          <InputRightAddon children="Quantity:" />
        </InputGroup>
      </GridItem>
    </>
  );
}
