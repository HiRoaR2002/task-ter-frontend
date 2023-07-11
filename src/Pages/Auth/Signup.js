import { Button, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import passshow from "../../assets/passshow.png"
import passhide from "../../assets/passhidden.png"
import axios from "axios"
// import { useHistory } from 'react-router-dom'

const Signup = () => {
  const [show, setShow] = useState('false');

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();


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
        },
      };
      const { data } = await axios.post("/api/auth/register", { username, password }, config);

      if (data) {
        toast({
          title: "Registration Successful!",
          description: "Go To Login Page",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      } else {
        console.log("Signup ERROR")
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }
  const handleClick = () => { setShow(!show) }

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input type='username' placeholder='Enter the Username' onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? 'password' : 'text'} placeholder='Enter the Password'
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
      <Button
        mt={'2rem'}
        colorScheme='blue'
        variant='outline'
        onClick={submitHandler}
        isLoading={loading}
      > Sign Up</Button>


    </VStack>
  )
}

export default Signup
