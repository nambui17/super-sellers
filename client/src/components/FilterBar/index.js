import React, { useState } from "react";
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
} from "@chakra-ui/react";

export default function FilterBar() {
  const genres =['Rock', 'Pop Music', 'Indie rock'];
  const [years, setYears] = useState([1950,2023]);
  const [genre, setGenre] = useState(null);
  const [artist, setArtist] = useState(null);
  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.200"
      align="stretch"
      textAlign={"center"}
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
          aria-label={["min", "max"]}
          defaultValue={[1950, 2023]} min={1950} max={2023} step={1}
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
  );
}
