import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import PageContainer from "../../layouts/PageContainer";
import { Link } from "react-router-dom";
import { LogUserIn, Login, Register, validateEmail } from "../../services/api";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const disabled =
    payload.email === "" ||
    payload.firstName === "" ||
    payload.lastName === "" ||
    payload.password === "" ||
    loading;
  const toast = useToast();
  const handleSubmit = async () => {
    if(payload.password.length < 8) {
      return toast({
        title: `Password must be 8 characters or more`,
        status: 'error',
        isClosable: true,
      })
    }
    if(payload.email.length < 4 || !validateEmail(payload.email)) {
      return toast({
        title: `Invalid email address`,
        status: 'error',
        isClosable: true,
      })
    }
    if(payload.email.indexOf('startlify') > -1){
      return toast({
        title: `You cannot sign up with a startlify email`,
        status: 'error',
        isClosable: true,
      })
    }
    // all good
    setLoading(true);
    const api = await Register(payload);
    setLoading(false);
    if(!api.success){
      toast({
        title: api.message,
        status: 'warning',
        isClosable: true,
      })
      return;
    }
    toast({
      title: "Successfully registered, Please wait while we sign you in ",
      status: 'success',
      isClosable: true,
    })
    const login = await Login(payload);
    if(!login){
      window.location.href="/auth/login"
    }
    await LogUserIn(login);
    window.location.href="/app/dashboard"
  };
  return (
    <PageContainer>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Signup and Conquer Your Inbox Chaos with StartlifyEmail.
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={payload.firstName}
                      onChange={(e) =>
                        setPayload({
                          ...payload,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={payload.lastName}
                      onChange={(e) =>
                        setPayload({
                          ...payload,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={payload.email}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      email: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={payload.password}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        password: e.target.value,
                      })
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  olorScheme={"green"}
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSubmit}
                  isLoading={loading}
                  isDisabled={disabled}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?
                  <Link to="/auth/login">
                    <Text color={"green.400"}>Login </Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </PageContainer>
  );
}
