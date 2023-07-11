import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
const Homepage = () => {
  return (
    <Container centerContent>
      <Box color={'white'} display={'flex'}
        flexDir={'column'} gap={'2rem'}>
        <Text mt={'1rem'}
          fontFamily={'cursive'}
          fontSize={'2rem'}
          border={'2px'}
          borderRadius={'15px'}
          bg={' #000099'}>TASK- TER</Text>

        <Box margin={'2rem'}

          alignItems={'center'}
          borderRadius={'2rem'}
          bg={'rgb(0, 0, 0,0.9)'}
          border={'2px solid black'}>
          <Tabs variant='soft-rounded' colorScheme='blue'
            margin={'1rem'}
            marginLeft={'6rem'}
            marginRight={'6rem'}>

            <TabList>
              <Tab fontWeight={'bold'}
                color={'white'}
                width={'100%'} >Login</Tab>
              <Tab color={'white'}
                width={'100%'}>SignUp</Tab>
            </TabList>
            <TabPanels >
              <TabPanel >
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Container>
  )
}

export default Homepage
