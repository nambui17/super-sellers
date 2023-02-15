import React, {useEffect} from 'react';
import {
  Card,
  CardBody,
  Image,
  Divider,
  Button,
  ButtonGroup,
  Text,
  Stack,
  Heading,
  CardFooter,
  GridItem,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './style.css';

function Record({id, image, title, artist, comments, quantity, price}) {
  // for records use the 300x300 images provided by the spotify api
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
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
  );
}


export default Record;



