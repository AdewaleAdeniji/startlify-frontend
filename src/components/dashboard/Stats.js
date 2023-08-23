import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiChevronDown, FiMail, FiServer } from "react-icons/fi";
import { CHANGE_EMAIL_TYPES } from "../../constants";
import { LogUserOut } from "../../services/api";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      rounded={"lg"}
      bg={"white"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }} color={"black"}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("green.500", "green.500")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics({
  emails,
  activeEmail,
  handleChangeEmail,
  totalEmails,
  showStats = true,
  loading,
}) {
  return (
    <Box maxW="7xl" px={{ base: 2, sm: 12, md: 1 }}>
      <Box textAlign={{ sm: "right", base: "center" }}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              {/* <Avatar
                  size={"sm"}
                  src={
                    "https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
                  }
                /> */}
              <FiMail />
              <VStack
                display={{ md: "flex" }}
                alignItems="flex-start"
                margin={{
                    base: 3
                }}
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">Showing {activeEmail} Email Inboxes</Text>
                <Text fontSize="xs" color="gray.600">
                  {activeEmail}
                </Text>
              </VStack>
              <Box display={{ md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            {emails.map((email) => {
              return (
                <MenuItem
                  key={email.emailAddressID}
                  onClick={() =>
                    handleChangeEmail(CHANGE_EMAIL_TYPES.EMAIL_SWITCHED, email)
                  }
                >
                  {email.emailAddress}
                </MenuItem>
              );
            })}
            <MenuDivider />
            <MenuItem onClick={LogUserOut}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {showStats && (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Email Addresses Created"}
            stat={emails.length}
            icon={<BsPerson size={"3em"} />}
          />
          <StatsCard
            title={"Total Email Received"}
            stat={totalEmails || 0}
            icon={<FiServer size={"3em"} />}
          />
        </SimpleGrid>
      )}
      <Box textAlign={{ sm: "right", base: "right" }}>
        <Button
          bg={"green.400"}
          color={"white"}
          margin={{
            base: 5,
          }}
          isDisabled={loading}
          onClick={() =>
            handleChangeEmail(CHANGE_EMAIL_TYPES.REFRESH, activeEmail)
          }
        >
          Refresh Email
        </Button>
      </Box>
    </Box>
  );
}
