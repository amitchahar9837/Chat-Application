import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [signupData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();
  const id = "toast-id";
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const toaster = (title, status) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        title,
        status,
        duration:5000,
        isClosable: true,
      });
    }
  }
  const validation = () =>{
    if(!signupData.email.length || !signupData.password.length || !signupData.confirmPassword.length){
        toaster("All fields are required", "error");
        return false;
    }
    else if(signupData.password !== signupData.confirmPassword){
        toaster("Passwords do not match", "error");
        return false;
    }
    return true;
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validation()) {
      return;
    }
    
    try {
      setIsLoading(true);
      const request = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/signup`,
        signupData, {
          withCredentials: true
        }
      );

      if(request.status === 201){
        setIsLoading(false);
        toaster(request.data.message, "success");
        navigate('/profile');
      }else{
        setIsLoading(false);
        toaster(request.data.message, "error");
      }

    } catch (error) {
      setIsLoading(false);
      toaster(error.response.data.message, "error");
    }
  }

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <form onSubmit={handleSignup}>
      <Input
        type="email"
        placeholder="Email"
        rounded="full"
        value={signupData.email}
        onChange={handleChange}
        id="email"
      />
      <InputGroup mt={4}>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Password"
          rounded="full"
          value={signupData.password}
          onChange={handleChange}
          id="password"
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
          id="confirmPassword"
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
  );
}
