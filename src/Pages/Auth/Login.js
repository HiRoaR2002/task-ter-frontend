import { Button, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import passshow from "../../assets/passshow.png"
import passhide from "../../assets/passhidden.png"
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [show, setShow] = useState('false');
  const [username, setUsername] = useState('');
  const handleClick = () => setShow(!show);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const history = useHistory()
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const submitHandler = async () => {
    setLoading(true);
    if (!username || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      };
      const { data } = await axios.post(
        "/api/auth/login", { username, password },
        config);
      if (data) {
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        // localStorage.setItem("authenticated", true);
        history.push("/task");
      } else {
        console.log("LOGIN ERROR");
      }
    }
    catch (error) {
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);

    }
  }
  return (
    <div>

      <VStack spacing={'5px'}>
        {/* <Button onClick={history.push('/task')}>press</Button> */}
        <FormControl isRequired >
          <FormLabel>Username</FormLabel>
          <Input type='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter the Username' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={show ? 'password' : 'text'} value={password} placeholder='Enter the Password'
              onChange={(e) => setPassword(e.target.value)} />
            <InputRightElement width={'4rem'}>
              <Button onClick={handleClick}>
                {show ?
                  <Image src={passhide} /> : <Image src={passshow} />
                }
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme='blue'
          variant='outline' mt={'2rem'}
          onClick={submitHandler} isLoading={loading}> Login </Button>
        <Button colorScheme='blue' variant='solid' onClick={() => {
          setUsername("guest@example");
          setPassword("1234567");
        }} >Login as a Guest User</Button>
      </VStack>
    </div>
  )
}

export default Login
