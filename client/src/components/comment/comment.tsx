import { DeleteComment } from "@/posts/post-overview/delete-comment/delete-comment";
import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Avatar } from "../avatar/avatar";

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
        <Flex justifyContent="flex-end">
          <DeleteComment id={id} />
        </Flex>
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
