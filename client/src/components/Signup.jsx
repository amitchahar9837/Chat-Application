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
  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      signupData.email === "" ||
      signupData.password === "" ||
      signupData.confirmPassword === ""
    ) {
      if (!toast.isActive(id)) {
        toast({
          id: id,
          title: "All fields are required",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      if (!toast.isActive(id)) {
        toast({
          id: id,
          title: "Passwords do not match",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    setIsLoading(true);
    try {
      const request = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/signup`,
        signupData, {
          withCredentials: true
        }
      );
      if (request) {
        setIsLoading(false);
        toast({
          id: id,
          title: "Signup Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log(request.data);
      } else {
        setIsLoading(false);
        toast({
          id: id,
          title: "Signup Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        id: id,
        title: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
