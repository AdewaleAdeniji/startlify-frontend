import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Text } from "chakra-ui";
import { filterAlphanumeric } from "../../helpers/utils";
import { CreateEmail } from "../../services/api";

const CreateEmailModal = ({ isOpen, onClose, onCreateEmail }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreateEmail = async () => {
    // Perform any actions before creating email
    // For example: call an API to create email
    //onCreateEmail(emailAddress);
    if(emailAddress.indexOf('startlify') > -1){
      return toast({
        title: `You cannot create an email with the word startlify`,
        status: 'error',
        isClosable: true,
      })
    }
    setLoading(true);
    const api = await CreateEmail({
      permanent: true,
      emailName: emailAddress,
    });
    setLoading(false);
    if (!api.success) {
      toast({
        title: api.message,
        status: "warning",
        isClosable: true,
      });
      return;
    } else {
      toast({
        title: `${emailAddress}@startlify.xyz has been created successfully!. You can now receive emails`,
        status: "success",
        isClosable: true,
      });
      setEmailAddress("");
      onCreateEmail(api.data);
    }
    // onClose();
  };

  const handleEmailAddress = (emailString) => {
    var email = filterAlphanumeric(emailString);
    if (email.length < 30) {
      setEmailAddress(email);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter name address @startlify.xyz"
            value={emailAddress}
            onChange={(e) => handleEmailAddress(e.target.value)}
          />
          <Text fontSize={12}>
            {emailAddress === "" ? "" : emailAddress + "@startlify.xyz"}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            onClick={handleCreateEmail}
            isLoading={loading}
            isDisabled={emailAddress.length < 4 ||  loading}
          >
            Create Email
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateEmailModal;
