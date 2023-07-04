import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { DeleteClubEventDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  IconButton,
  Modal,
  ModalOverlay,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

export const DeleteEventModal: React.FC<{ id: number }> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteClubEvent, { loading }] = useMutation(DeleteClubEventDocument, {
    variables: { id },
  });
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
            <Text>Proceed to delete event ?</Text>
          </ModalBody>

          <ModalFooter>
            <SecondaryButton mr={3} onClick={onClose}>
              Cancel
            </SecondaryButton>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => deleteClubEvent()}
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
