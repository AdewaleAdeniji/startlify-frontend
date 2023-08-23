import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Text,
  VStack,
  useColorModeValue,
  useToast,
  chakra,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SidebarWithHeader from "../../components/layout/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { GetEmailDetails } from "../../services/api";
import { formatDate } from "../../services/date";
import { useCache } from "../../helpers/utils";

const EmailDetail = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { getData, saveData } = useCache();
  const { emailID, emailAddressID } = useParams();
  const [mail, setMail] = useState(getData(`${emailAddressID}-${emailID}`, {}));
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const bgColor = useColorModeValue("white", "black");

  useEffect(() => {
    // setEmails([]);
    getEmail(true);
  }, [emailID, emailAddressID]);
  if (!emailID || !emailAddressID) {
    window.location.href = "/app/dashboard";
    return;
  }
  const getEmail = async () => {
    setLoading(true);
    setLoadingText("Getting email .....");
    const api = await GetEmailDetails(emailID, emailAddressID);
    setLoading(false);
    if (!api.success) {
      return toast({
        title: api.message,
        status: "error",
        isClosable: true,
      });
    }
    saveData(`${emailAddressID}-${emailID}`, api.data);
    setMail(api.data);
  };
  return (
    <SidebarWithHeader>
      <VStack p={4} spacing={4} align="stretch">
        {/* Header Bar */}
        <Flex alignItems="center">
          <IconButton
            aria-label="Back"
            icon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => navigate(-1)}
          />
          <Text fontWeight="bold" ml={2} flex="1">
            {loading && !mail._id ? (
              <chakra.h1
                textAlign={"left"}
                fontSize={"sm"}
                fontWeight={"bold"}
                p={5}
              >
                <Spinner />
              </chakra.h1>
            ) : (
              mail?.fromName + " - " + mail?.subject
            )}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {loading && !mail._id ? (
              <chakra.h1
                textAlign={"left"}
                fontSize={"sm"}
                fontWeight={"bold"}
                p={5}
              >
                <Spinner />
              </chakra.h1>
            ) : (
              formatDate(mail?.createdAt)
            )}
          </Text>
        </Flex>

        {/* Email Content */}
        <Box borderWidth="1px" borderColor="white.200" p={4} bg={bgColor}>
          {loading && !mail._id ? (
            <chakra.h1
              textAlign={"center"}
              fontSize={"sm"}
              fontWeight={"bold"}
              p={5}
            >
              <Spinner /> {loadingText}
            </chakra.h1>
          ) : (
            <>{parse(mail?.html)}</>
          )}
        </Box>
      </VStack>
    </SidebarWithHeader>
  );
};
export default EmailDetail;
