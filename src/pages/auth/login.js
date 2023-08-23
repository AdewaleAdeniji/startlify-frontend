import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../layouts/PageContainer";
import { LogUserIn, Login, validateEmail } from "../../services/api";
  
  export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [payload, setPayload] = useState({
      email: "test@email.co",
      password: "ddsksdddkdk",
    });
    const [loading, setLoading] = useState(false);
    const disabled =
      payload.email === "" ||
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
      // all good
      setLoading(true);
      const api = await Login(payload);
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
        title: "Logged in successfully",
        status: 'success',
        isClosable: true,
      })
      await LogUserIn(api);
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
                Login
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Embrace the Future of Email Management: Secure Login to
                StartlifyEmail.
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
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
                    Login
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    New User? 
                    <Link to="/auth/signup">
                      <Text color={"green.400"}>Register </Text>
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
  