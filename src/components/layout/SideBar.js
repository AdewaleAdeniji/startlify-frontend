import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { FiChevronDown, FiHome, FiMenu } from "react-icons/fi";
import { CHANGE_EMAIL_TYPES } from "../../constants";
import { SidebarContent } from "./SideBarContent";
import { getUser } from "../../services/api";

const LinkItems = [
  { name: "Dashboard", icon: FiHome, path: "/app/dashboard" },
  //   { name: 'Trending', icon: FiTrendingUp },
  //   { name: 'Explore', icon: FiCompass },
  //   { name: 'Favourites', icon: FiStar },
  //   { name: 'Settings', icon: FiSettings },
];

const MobileNav = ({
  onOpen,
  emails,
  activeEmail,
  handleChangeEmail,
  ...rest
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = getUser();
  //console.log(user);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Startlify
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} mr={"10px"}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.firstName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.lastName}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
                <MenuItem>Profile</MenuItem>
              {/* {emails.map((email) => {
                return (
                  <MenuItem
                    key={email.emailAddressID}
                    onClick={() =>
                      handleChangeEmail(
                        CHANGE_EMAIL_TYPES.EMAIL_SWITCHED,
                        email
                      )
                    }
                  >
                    {email.emailAddress}
                  </MenuItem>
                );
              })} */}
              <MenuDivider />
            
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({
  children,
  emails,
  activeEmail,
  handleChangeEmail,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        handleChangeEmail={handleChangeEmail}
        emails={emails}
        linkItems={LinkItems}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            linkItems={LinkItems}
            handleChangeEmail={handleChangeEmail}
            emails={emails}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        onOpen={onOpen}
        emails={emails}
        activeEmail={activeEmail}
        handleChangeEmail={handleChangeEmail}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
