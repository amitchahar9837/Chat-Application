import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/AuthSlice";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const id = "toast-id";
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toaster = (title, status) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        title,
        status,
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const validation = () => {
    if (!loginData.email.length || !loginData.password.length) {
      toaster("All fields are required", "error");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validation()) return;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/login`,
        loginData,
        {
          withCredentials: true,
        }
      )
      if(res.status === 200){
        setIsLoading(false);
        dispatch(setUser(res.data.user));
        if(res.data.user.profileSetup) navigate('/chat');
        else navigate('/profile');
      }else{
        setIsLoading(false);
        toaster(res.data.message, "error");
      }
      
    } catch (error) {
      setIsLoading(false);
      toaster(error.response.data.message, "error");
    }
  };

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <form onSubmit={handleLogin}>
      <FormControl>
        <Input
          type="email"
          placeholder="Email"
          rounded="full"
          value={loginData.email}
          onChange={handleChange}
          id="email"
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
  );
}
