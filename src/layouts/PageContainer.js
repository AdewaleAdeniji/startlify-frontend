import {
    Box,
    Flex,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import NavBar from "../components/layout/NavBar";


const PageContainer = ({ children }) => {
  return (
    <>
    <NavBar/>

      {children}
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          StartlifyEmail
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2023 All rights reserved
        </Text>
      </Box>
    </>
  );
};

export default PageContainer;

