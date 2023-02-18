import React, {useState} from 'react';
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
  Tr,
  Td,
} from '@chakra-ui/react';
import { idbPromise } from '../../utils/helpers';
import './style.css';

export default function CartItem({ record }) {
  const [state, dispatch] = useStoreContext();
  const removeFromCart = (record) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: record._id,
    });
    idbPromise('cart', 'delete', { ...record });
  };
  const [val, setVal] = useState(record.purchaseQuantity);

  const onBlur = (e) => {
    const value = e.target.value;
    if (value === '0' || value === '') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: record._id,
      });
      idbPromise('cart', 'delete', { ...record });
    } else if (value !== '') {
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

  const onChange = (e) => {
    const value = e.target.value;
    setVal(value);
  }

  return (
    <Tr>
      <Td>
        <Image src={record.image}/>
        <h3>{record.title}</h3>
      </Td>
      <Td>
        <h3>Price per: ${record.price}</h3>
        <h3>Price: ${parseFloat(record.price)*parseInt(record.purchaseQuantity)}</h3>
      </Td>
      <Td className='inputColumn'>
          <Input value={val} onChange={onChange} onBlur={onBlur} className='qIn' type={'number'}/>
      </Td>
    </Tr>
  );
}
