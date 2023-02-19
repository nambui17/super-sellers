import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Alert,
  AlertIcon
} from '@chakra-ui/react';

export default function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const [correct, setCorrect] = useState(true);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      window.location.assign('/');
    } catch (e) {
      setCorrect(false);
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Flex
      color="#000000"
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={`#ffffff`}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool<Link color={'blue.400'}>Records</Link>
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={`#ffffff`} boxShadow={'lg'} p={8}>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={4}>
              <FormControl ml="0px" id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleChange} name="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={handleChange}
                  name="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type= "submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleFormSubmit}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        {correct ? <></> : 
                <Alert status='error'>
                  <AlertIcon/>
                  Incorrect username or password!
                </Alert>}
      </Stack>
    </Flex>
  );
}
