import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { Text } from 'chakra-ui';

const CreateEmailModal = ({ isOpen, onClose, onCreateEmail }) => {
  const [emailAddress, setEmailAddress] = useState('');

  const handleCreateEmail = () => {
    // Perform any actions before creating email
    // For example: call an API to create email
    onCreateEmail(emailAddress);
    setEmailAddress("")
    // onClose();
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
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <Text fontSize={12}>{emailAddress === "" ? "" : emailAddress + "@startlify.xyz"}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={handleCreateEmail}>
            Create Email
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateEmailModal;
