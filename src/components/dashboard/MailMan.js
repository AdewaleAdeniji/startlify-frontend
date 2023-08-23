import React from "react";
import { Box, Divider, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import DashboardTable from "../../components/dashboard/table";
import { formatDate } from "../../services/date";

const MailMan = ({ emails, handleOpenEmail }) => {
  const color = useColorModeValue("black", "black")
  return (
    <>
      {emails.map((email) => {
        return (
          <Box
            p={3}
            borderRadius="md"
            borderWidth="1px"
            m={3}
            bg={"white"}
            borderColor="gray.200"
            display={{ base: "block", md: "none" }} // Display on mobile only
            onClick={() => handleOpenEmail(email?.emailAddressID, email?.emailID)}
          >
            <Flex alignItems="center">
              <Image
                src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
                boxSize="40px"
                alt={email?.emailFrom}
                objectFit="cover"
                mr={3}
              />
              <Box flex="1">
                <Text fontWeight="bold" color={color}>{email?.subject}</Text>
                <Text fontSize="sm" color="gray.600">
                {email?.text}....
                </Text>
              </Box>
              
            </Flex>
              <Divider />
              
              <Text fontSize="sm" textAlign="right" color="gray.600">
              {formatDate(email?.sendDate)}
              </Text>
          </Box>
        );
      })}

      <Box
        display={{ base: "none", md: "block" }} // Display on mobile only
      >
        <DashboardTable emails={emails} handleOpenEmail={handleOpenEmail}/>
      </Box>
    </>
  );
};

export default MailMan;
