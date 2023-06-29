import styled from "@emotion/styled";
import { Avatar } from "../avatar/avatar";
import { Text } from "@chakra-ui/react";
import { DeleteModal } from "../delete-modal/delete-modal";
import { useMutation } from "@apollo/client";
import {
  DeleteCommentDocument,
  PostCommentsDocument,
} from "@/generated/graphql";

interface CommentProps {
  id: number;
  content: string;
  isOwner: boolean;
  creator: {
    username: string;
  };
}
export const Comment: React.FC<CommentProps> = ({
  id,
  creator,
  content,
  isOwner,
}) => {
  const [deleteComment, { loading, error }] = useMutation(
    DeleteCommentDocument,
    { variables: { commentId: id }, refetchQueries: [PostCommentsDocument] }
  );

  return (
    <Container>
      <ContentContainer>
        <Avatar value={creator.username} size="sm" />
        <Text fontSize="xs">{creator.username}</Text>
      </ContentContainer>
      <TextContainer>
        <Text>{content}</Text>
      </TextContainer>
      {isOwner && (
        <DeleteComment>
          <DeleteModal
            id={id}
            entity="comment"
            error={error}
            loading={loading}
            deleteEntityFunction={deleteComment}
          />
        </DeleteComment>
      )}
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "10px 0",
  flexDirection: "column",
  borderBottom: `1px solid ${theme.palette.background.tertiary}`,
  gap: "2px",
}));

const ContentContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});

const TextContainer = styled("div")({
  paddingLeft: "32px",
});

const DeleteComment = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});
