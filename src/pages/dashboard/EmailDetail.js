import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SidebarWithHeader from "../../components/layout/SideBar";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const EmailDetail = () => {
  const navigate = useNavigate();
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
            Sender - subject of the email
          </Text>
          <Text fontSize="sm" color="gray.600">
            date
          </Text>
        </Flex>

        {/* Email Content */}
        <Box borderWidth="1px" borderColor="white.200" p={4} bg={useColorModeValue("white", "black")}>
          {parse(`<div dir="ltr"><div><br></div></div><br>
<div><span><span><b>Moniepoint Inc</b></span></span></div><div>The Post Square,<br>Off Adeola Odeku, Victoria Island<br>Lagos, Nigeria<br></div><div><span><span><a href="http://www.teamapt.com" target="_blank"><u>www.moniepoint.com</u></a></span></span></div><div><span><br></span></div><span><span>Disclaimer:
This email including any attached files may contain confidential and privileged information for the sole use of the designated recipient. </span></span><div><span><span>Please note that the views expressed therein do not represent the views of </span></span>Moniepoint Inc<span><span>. except where specifically stated. </span></span></div><div><span><span>Any review, use, distribution or disclosure by others is strictly prohibited. </span></span></div><div><span><span>If you are not the designated recipient (or authorized to receive information for the designated recipient), please inform the sender by reply email and delete all copies of the message. </span></span></div><div><span><span>Moniepoint Inc. will not accept any liability for loss or damage arising directly or indirectly from the transmission of this message.</span></span><br></div>`)}
        </Box>
      </VStack>
    </SidebarWithHeader>
  );
};
export default EmailDetail;
