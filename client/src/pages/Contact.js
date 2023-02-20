import React from 'react';
import {
    Button,
    Box,
    Link,
    Heading,
    Image
} from '@chakra-ui/react';
import { 
    EmailIcon
} from '@chakra-ui/icons';
import {animated, useSpring} from '@react-spring/web';


function Contact() {
    const AnimatedImage = animated(Image);
    const prop = useSpring({
        from: {y: 400, opacity: 0, rotate:0},
        to: { y: 0, opacity: 1, rotate: 360},
        config: {
            mass: 5,
            tension: 50,
        }
    })
    return (
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'} height={'100vh'} justifyContent={'start'} flexWrap>
            <Heading>Click the button below to send us an email with any questions.</Heading>
            <Link padding={'20px 0 30px 0'} href="mailto: garrettohrt@gmail.com">
                <Button leftIcon={<EmailIcon />}  colorScheme='teal' variant='solid'>
                    Email
                </Button>
            </Link>
            <AnimatedImage style={prop} src='/assets/images/questions.jpg' boxSize='20vw' objectFit='cover' borderRadius={'full'}/>
        </Box>


    )
};

export default Contact;