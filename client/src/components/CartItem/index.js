import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { Box } from '@chakra-ui/react';
import { idbPromise } from '../../utils/helpers';

export default function CartItem({record}) {
    const [, dispatch] = useStoreContext();
    const removeFromCart = record => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: record._id
        });
        idbPromise('cart', 'delete', {...record});
    };

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: record._id
            });
            idbPromise('cart', 'delete', {...record});
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: record._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart','put', {...record, purchaseQuantity: parseInt(value)});
        }
    }
    return (
        <Box></Box>
    )
}
