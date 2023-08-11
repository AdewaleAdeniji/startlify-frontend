import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import DashboardTable from "../../components/dashboard/table";

const MailMan = ({ emails }) => {
  return (
    <>
      {emails.map((email) => {
        return (
          <Box
            p={3}
            borderRadius="md"
            borderWidth="1px"
            bg={"white"}
            borderColor="gray.200"
            display={{ base: "block", md: "none" }} // Display on mobile only
          >
            <Flex alignItems="center">
              <Image
                src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
                boxSize="40px"
                objectFit="cover"
                mr={3}
              />
              <Box flex="1">
                <Text fontWeight="bold">Title of the email</Text>
                <Text fontSize="sm" color="gray.600">
                  some excerpts from the email
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.600">
                24/09/2002
              </Text>
            </Flex>
          </Box>
        );
      })}

      <Box
        display={{ base: "none", md: "block" }} // Display on mobile only
      >
        <DashboardTable emails={emails} />
      </Box>
    </>
  );
};

export default MailMan;
