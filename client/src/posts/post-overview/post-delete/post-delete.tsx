import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { ClubPostsDocument, DeletePostDocument } from "@/generated/graphql";
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
import { useRouter } from "next/router";

export const PostDelete: React.FC<{ id: number; clubId: number }> = ({
  id,
  clubId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletePost, { loading }] = useMutation(DeletePostDocument, {
    variables: { deletePostId: id },
    refetchQueries: [ClubPostsDocument],
  });
  const router = useRouter();
  const handleDelete = () => {
    deletePost();
    router.push(`/clubs/${clubId}`);
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
            <Text>Proceed to delete post ?</Text>
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
