import React from 'react';
import { Image, Box, Grid, GridItem } from '@chakra-ui/react';
import spotifyLogo from './image/Spotify_Logo_CMYK_Green.png';
import "./footer.css";

export default function Footer() {
  return (
    <div className='spotflex'>
      <div>
        <Box boxSize="50px">
          <Image
            className="spotify"
            src={spotifyLogo}
            alt="Spotify Logo"
          />
        </Box>
      </div>
    </div>
  );
}
