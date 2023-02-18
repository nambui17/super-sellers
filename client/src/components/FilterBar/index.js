import React, { useRef, useState } from 'react';
import {
  VStack,
  Box,
  StackDivider,
  Heading,
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

export default function FilterBar() {
  const genres = ['Rock', 'Pop Music', 'Indie rock'];
  const [years, setYears] = useState([1950, 2023]);
  const [genre, setGenre] = useState(null);
  const [artist, setArtist] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Button ref={btnRef} colorScheme="green" onClick={onOpen} variant='ghost'>
        Filter
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Records</DrawerHeader>
          <VStack
            divider={<StackDivider />}
            borderColor="gray.200"
            align="stretch"
            textAlign={'center'}
          >
            <Box>
              <Heading>Artist</Heading>
              <Input placeholder="Artist"></Input>
            </Box>
            <Box>
              <Heading>Genre</Heading>
              {genres.map((genre) => (
                <Checkbox key={genre}>{genre}</Checkbox>
              ))}
            </Box>
            <Box>
              <Heading>Year</Heading>
              <RangeSlider
                aria-label={['min', 'max']}
                defaultValue={[1950, 2023]}
                min={1950}
                max={2023}
                step={1}
                onChangeEnd={(val) => setYears(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </Box>
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}
