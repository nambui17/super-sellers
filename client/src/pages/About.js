import React from "react";
import { Image, Text, Heading, Flex, Box } from "@chakra-ui/react";

function About() {
  const styles = {
    aboutBox: {
      width: "50vw",
    },
  };
  return (
    <Flex justify={"center"}>
      <Box>
        <Image />
        <Box>
          <Heading>About us</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            mauris id dictum egestas. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Mauris nec urna gravida, blandit leo lobortis,
            dignissim elit. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Fusce finibus mi elit, id
            ullamcorper lacus interdum a. Sed sit amet arcu venenatis, feugiat
            augue ac, maximus felis. Fusce at lectus ex. Quisque scelerisque
            rhoncus orci. Suspendisse id lectus sodales, pharetra nunc ac,
            hendrerit turpis. Nullam eu lorem quis nisi eleifend ornare ac ac
            leo. Aenean sit amet sodales justo.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default About;
