import React from "react";
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
  GridItem
} from "@chakra-ui/react";
import './style.css';

function Record() {
  // for records use the 300x300 images provided by the spotify api
  return (
    <Card maxW="sm" className="record">
      <CardBody>
        <Image
          src="https://i.scdn.co/image/ab67616d00001e02bd26ede1ae69327010d49946"
          alt="Dua Lipa Future Nostalgia"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Future Nostalgia</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $25.00
          </Text>
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
