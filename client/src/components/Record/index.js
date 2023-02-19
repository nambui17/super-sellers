import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Divider,
  Button,
  ButtonGroup,
  Stack,
  Heading,
  CardFooter,
  List,
  ListItem,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_WISHLIST } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './style.css';

function Record({id, image, title, artist, comments, quantity, price}) {
  const [state, dispatch] = useStoreContext();
  const [wishlistAdd, {error}] = useMutation(ADD_WISHLIST);
  const record = {
    _id: id,
    image,
    title,
    artist,
    comments,
    quantity,
    price
  }
  const { cart } = state;
  const toast = useToast();
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      toast({
        title: 'Record Quantity Updated',
        description: 'Record Quantity Increased in Cart',
        status: 'success',
        variant: 'subtle',
        duration: 2000,
        isClosable: true,
      })
    } else {
      dispatch({
        type: ADD_TO_CART,
        record: {
          ...record,
          purchaseQuantity: 1
        }
      });
      idbPromise('cart', 'put', {...record, purchaseQuantity: 1});
      toast({
        title: 'Record Added',
        description: 'Record Added to Cart!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }
  async function handleWishlistAdd() {
    if (Auth.loggedIn()) {
      const { data } = await wishlistAdd({
        variables: {
          "record": {
            "albumTitle": title,
            "_id": id,
            "artist": artist,
            "quantity": parseInt(quantity),
            "imageUrl": image,
            "price": parseFloat(price),
          }
      }
      }
      );
      toast({
        title: 'I wish I wish',
        description: 'Record added to your wishlist!',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Can't add to wishlist!",
        description: "You're not logged in!",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
      <Card maxW="sm" className="record">
        <CardBody>
          <Link to={`/merch/${id}`}>
          <Image
            src={image}
            alt={title}
            borderRadius="lg"
            data-id={id}
          />
          </Link>
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"}>{title}</Heading>
            <List>
              <ListItem>
                Artist: {artist}
              </ListItem>
              <ListItem>
                Price: ${price}
              </ListItem>
              <ListItem>
                Condition: {comments}
              </ListItem>
              <ListItem>
                Quantity: {quantity}
              </ListItem>
            </List>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="green" onClick={addToCart}>
              Add to cart
            </Button>
            <Button variant='outline' colorScheme='orange' onClick={handleWishlistAdd}>
              Add to Wishlist
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
  );
}


export default Record;



