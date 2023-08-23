import { useColorModeValue, Box, Flex, CloseButton, Text, Icon } from "@chakra-ui/react";
import { useState } from "react";
import CreateEmailModal from "../dashboard/CreateModal";
import { FiHome, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CHANGE_EMAIL_TYPES } from "../../constants";

export const SidebarContent = ({ onClose, handleChangeEmail,  ...rest }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleCreateEmail = (email) => {
      console.log(email);
      //setModalOpen(false);
      handleChangeEmail(CHANGE_EMAIL_TYPES.EMAIL_CREATED, email)
    };
    const LinkItems = [
        { name: "Dashboard", icon: FiHome, path: "/app/dashboard" },
        //   { name: 'Trending', icon: FiTrendingUp },
        //   { name: 'Explore', icon: FiCompass },
        //   { name: 'Favourites', icon: FiStar },
        //   { name: 'Settings', icon: FiSettings },
    ];
    
    return (
      <>
        <Box
          transition="3s ease"
          bg={useColorModeValue("white", "gray.900")}
          borderRight="1px"
          borderRightColor={useColorModeValue("gray.200", "gray.700")}
          w={{ base: "full", md: 60 }}
          pos="fixed"
          h="full"
          {...rest}
        >
          <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Startlify
            </Text>
            <CloseButton
              display={{ base: "flex", md: "none" }}
              onClick={onClose}
            />
          </Flex>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          ))}
          <NavItem
            icon={FiPlus}
            bg={"green.400"}
            color={"white"}
            onClick={() => setModalOpen(true)}
          >
            Create Email
          </NavItem>
        </Box>
        <CreateEmailModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreateEmail={handleCreateEmail}
        />
      </>
    );
  };
  
export const NavItem = ({ icon, children, path, ...rest }) => {
    return (
      <Box
        as="a"
        href="#"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Link to={path}>
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "green.400",
              color: "white",
            }}
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="13"
                _groupHover={{
                  color: "white",
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Link>
      </Box>
    );
  };