import React from 'react';
import { Flex } from '@chakra-ui/react';

import Record from '../components/Record';

function Merchandise() {

    return (
        <Flex>
            <Record/>
            <Record/>
        </Flex>
    )
}

export default Merchandise;