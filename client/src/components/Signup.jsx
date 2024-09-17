import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, FormControl, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Login() {
      const [signupData,setLoginData] = useState({
            email:'',
            password:'',
            confirmPassword:''
      })
      const [isLoading, setIsLoading] = useState(false);
      const [show, setShow] = useState(false);
      const [showConfirm, setShowConfirm] = useState(false);
      const handleLogin = async (e) => {
        e.preventDefault();
        if(signupData.email === "" || signupData.password === "" || signupData.confirmPassword === "") {
              return; // You should have validation logic here
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
        <Input
          type="email"
          placeholder="Email"
          rounded="full"
          value={signupData.email}
          onChange={handleChange}
          id='email'
        />
      <InputGroup mt={4}>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Password"
          rounded="full"
          value={signupData.password}
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
      <InputGroup mt={4}>
        <Input
          pr="4.5rem"
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          rounded="full"
          value={signupData.confirmPassword}
          onChange={handleChange}
          id='confirmPassword'
          
        />
        <InputRightElement width="4.5rem">
          <Icon
            as={showConfirm ? ViewOffIcon : ViewIcon}
            onClick={() => setShowConfirm(!showConfirm)}
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
        Signup
      </Button>
    </form>
  )
}
