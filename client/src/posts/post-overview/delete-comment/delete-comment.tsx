import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import {
  DeleteCommentDocument,
  PostCommentsDocument,
} from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export const DeleteComment: React.FC<{ id: number }> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteComment, { loading }] = useMutation(DeleteCommentDocument, {
    variables: { commentId: id },
    refetchQueries: [PostCommentsDocument],
  });
  const handleDelete = () => {
    deleteComment();
    onClose();
  };
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
            <Text>Proceed to delete comment ?</Text>
          </ModalBody>

          <ModalFooter>
            <SecondaryButton mr={3} onClick={onClose}>
              Cancel
            </SecondaryButton>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleDelete}
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
