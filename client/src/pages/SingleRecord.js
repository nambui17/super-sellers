import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_RECORD } from '../utils/queries';
import {
  Spinner,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Record from '../components/Record';
import { animated, useSpring } from '@react-spring/web';

export default function SingleRecord() {
  const { recordId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_RECORD, {
    variables: { id: recordId },
  });

  const record = data?.record || {};
  const AnimatedGridItem = animated(GridItem);
  const prop = useSpring({
    from: {x:-300, opacity:0},
    to: {x: 0, opacity: 1},
    config: {
      mass: 5,
      tension: 80
    }
  })
  return (
    <Grid templateColumns="repeat(5,1fr)">
      {loading ? (
        <Spinner />
      ) : (
        <AnimatedGridItem
          colStart={2}
          colEnd={4}
          colSpan={2}
          rowSpan={1}
          flex
          justifyContent={'center'}
          style={prop}
        >
          <Record
            key={record._id}
            id={record._id}
            image={record.imageUrl}
            title={record.albumTitle}
            artist={record.artist}
            comments={record.comments}
            quantity={record.quantity}
            price={`${record.price}`}
            style={prop}
          />
        </AnimatedGridItem>
      )}
      {loading ? (
        <GridItem>
          <Spinner />
        </GridItem>
      ) : (
        <GridItem colStart={4}>
          <iframe
            title="Spotify"
            className="SpotifyPlayer"
            src={`https://embed.spotify.com/?uri=${record.spotifyUri}&view=list&theme=black`}
            width="800"
            height="800"
          />
        </GridItem>
      )}
    </Grid>
  );
}
