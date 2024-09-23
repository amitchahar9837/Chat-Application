import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, FormControl, Icon, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Login() {
      const [loginData,setLoginData] = useState({
            email:'',
            password:''
      })
      const toast = useToast();
      const id = 'toast-id';
      const [isLoading, setIsLoading] = useState(false);
      const [show, setShow] = useState(false);
      const handleLogin = async (e) => {
        e.preventDefault();
        if(loginData.email === "" || loginData.password === "") {
          if(!toast.isActive(id)){
            toast({
              id: id,
              title: 'All fields are required',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
          return;
        }
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      };

      const handleChange = (e)=>{
            setLoginData((prev)=>({...prev,[e.target.id]:e.target.value}))
      }
  return (
      <form onSubmit={handleLogin}>
      <FormControl>
        <Input
          type="email"
          placeholder="Email"
          rounded="full"
          value={loginData.email}
          onChange={handleChange}
          id='email'
        />
      </FormControl>

      <InputGroup mt={4}>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Password"
          rounded="full"
          value={loginData.password}
          onChange={handleChange}
          id='password'
          
        />
        <InputRightElement width="4.5rem">
          <Icon
            as={show ? ViewOffIcon : ViewIcon}
            onClick={() => setShow(!show)}
            cursor="pointer"
          />
        </InputRightElement>
      </InputGroup>

      <Button
        mt={6}
        w="full"
        colorScheme="purple"
        isLoading={isLoading}
        type="submit"
        rounded="full"
      >
        Login
      </Button>
    </form>
  )
}
