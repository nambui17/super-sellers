import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_RECORDS
} from '../utils/actions';
import { QUERY_MANY_RECORDS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { Spinner, Box } from '@chakra-ui/react';

export default function SingleRecord() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();
    const [currentRecord, setCurrentRecord] = useState({});
    const { loading, data } = useQuery(QUERY_MANY_RECORDS);

    const { records, cart } = state;

    useEffect(() => {
        if (records.length) {
            setCurrentRecord(records.find((record) => record._id === id));
        } else if (data) {
            dispatch({
                type: UPDATE_RECORDS,
                records: data.records
            });
            data.records.forEach((record) => {
                idbPromise('records', 'put', record);
            })
        } else if (!loading) {
            idbPromise('records', 'get').then((indexedRecords) => {
                dispatch({
                    type: UPDATE_RECORDS,
                    records: indexedRecords,
                });
            });
        }
    }, [records, data, loading, dispatch, id]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            idbPromise('cart','put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                record: {...currentRecord, purchaseQuantity: 1},
            });
            idbPromise('cart', 'put', {...currentRecord, purchaseQuantity: 1});
        }
    }
    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentRecord._id,
        });
        idbPromise('cart', 'delete', {...currentRecord});
    }

    return (
        <>
            <Box>
                <Link to='/merch'>Back to Records</Link>
            </Box>
        </>
    )
}