import { Avatar, Box, Button, Container, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useToast } from '@chakra-ui/react'
// import React, { useContext, useState } from 'react'
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const TaskPage = () => {

  const history = useHistory();
  const toast = useToast()
  const [taskInd, setTaskInd] = useState();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();
  const [taskData, setTaskData] = useState([]);
  const [toRemove, setToRemove] = useState();
  const [newTask, setNewTask] = useState();
  const logoutHandler = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get("/api/auth/logout", config);
    if (data) {
      toast({
        title: "Logged Out!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      history.push('/');
    }
  }

  const profileHandler = async (req, res) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.get("/api/auth/profile", config)
      .then((data) => {
        setUserData(data.data.username);
        setUserId(data.data._id);
        setTaskData(data.data.task);
        console.log(data.data);
        // console.log({ taskInd });
      });
  }
  const addTask = async (req, res) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    setLoading(true);
    if (!newTask) {
      toast({
        title: "Please Enter the Task Name",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const { added } = await axios.post("/api/auth/tasks",
        { userId: userId, taskname: newTask }, config);
      toast({
        title: "Task Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      window.location.reload();
    }
    catch {
      toast({
        title: "Failed To Add Task",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }
  const taskDel = async (tname) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    setLoading(true);
    try {
      console.log(toRemove)
      const { removed } = await axios.put("/api/auth/removetask",
        { userId: userId, taskname: tname }, config);
      toast({
        title: "Task Removed Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      window.location.reload();
    }
    catch {
      toast({
        title: "Failed To Remove Task",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    profileHandler();
  }, [])
  return (
    <Container centerContent>
      <Box boxShadow={'dark-lg'} display={'flex'}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar size={'sm'} cursor={'pointer'} name={userData} />
          </MenuButton>
          <MenuList color={'black'}>
            <MenuItem>Username :{userData}

              <Text color={'black'}></Text>

              <Text color={'blue'} fontFamily={'cursive'}></Text></MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box boxShadow={'dark-lg'} bg={'whitesmoke'} mt={'2rem'} justifyContent={'space-between'}
        pl={'10rem'} pr={'10rem'}>
        <Text fontSize={'2rem'}
          fontFamily={'cursive'}
          fontWeight={'bold'} >Taskbox</Text>

      </Box>
      <Box mt={'2rem'} boxShadow={'dark-lg'}
        padding={'2rem'} bg={'whitesmoke'} display={'flex'}
        flexDir={'column'}>
        <Box display={'flex'} flexDir={'row'} mb={'2rem'}>
          <Input type='text' placeholder='Enter the task'
            value={newTask} onChange={(e) => setNewTask(e.target.value)}
          />
          <Button colorScheme='blue'
            variant='outline' onClick={addTask}>
            Add new task
          </Button>
        </Box>
        <Box >

          {
            taskData.map((task, index) => (
              <> <Box display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'} border={'1px lightblue solid'}
                borderRadius={'1rem'} gap={'1rem'} margin={'1rem'}>
                <Text key={index} pl={'1rem'}>{task}
                </Text>
                <DeleteIcon key={task} cursor={'pointer'}
                  onClick={() => {
                    taskDel(task);
                    console.log(task);
                  }}
                />
              </Box>

              </>
            )

            )
          }
        </Box>
      </Box>

    </Container>
  )
}



export default TaskPage
