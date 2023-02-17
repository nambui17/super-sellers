import React from 'react';
import { Image, Box } from '@chakra-ui/react';
import spotify from './image/1298766_spotify_music_sound_icon.png'
import "./footer.css";

export default function Footer() {
  return (
    <div className='spotflex'>
      <div>
        <Box boxSize="50px">
          <Image
            className="spotify"
            src={spotify}
            alt="Spotify Logo"
          />
        </Box>
      </div>
    </div>
  );
}
