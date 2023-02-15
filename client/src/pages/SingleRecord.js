import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'; 
import { Box, Spinner } from '@chakra-ui/react';
import Record from '../components/Record';

export default function SingleRecord() {
    const { recordId } = useParams();
    // // const { loading, data } = useQuery(QUERY_SINGLE_RECORD, {
    // //     variables: { _id: recordId },
    // // })
    return (
        <Box>
            {/* loading ? <Spinner/> : <Record/>< */}
            <Record/>
        </Box>
    )
}