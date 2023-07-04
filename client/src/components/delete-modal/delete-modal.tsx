import { ApolloError } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SecondaryButton } from "../secondary-button/secondary-button";

interface DeleteModalProps {
  id: number;
  entity: "post" | "comment";
  error: ApolloError | undefined;
  loading: boolean;
  deleteEntityFunction: () => void;
}
export const DeleteModal: React.FC<DeleteModalProps> = ({
  entity,
  loading,
  error,
  deleteEntityFunction,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteFunction = () => {
    deleteEntityFunction();
    onClose();
  };
  console.log(error);
  return (
    <>
      <IconButton
        aria-label="delete comment"
        variant={"ghost"}
        icon={<DeleteIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Text>Proceed to delete {entity} ?</Text>
          </ModalBody>

          <ModalFooter>
            <SecondaryButton mr={3} onClick={onClose}>
              Cancel
            </SecondaryButton>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={deleteFunction}
              isLoading={loading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
