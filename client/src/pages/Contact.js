import React from 'react';
import {
    Button
} from '@chakra-ui/react';

const styles = {
    div:{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "100px"
    },
    button:{
        paddingTop: "20px"
    }
 
}

function Contact() {
    return (
        <div style={styles.div}>
            <h2>Click the button below to send us an email with any questions.</h2>

            <a style={styles.button} href="mailto: garrettohrt@gmail.com">
                <Button colorScheme='teal' variant='solid'>
                    Email
                </Button>
            </a>
        </div>


    )
};

export default Contact;