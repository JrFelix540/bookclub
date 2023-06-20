import { PrimaryButton } from "@/components/primary-button/primary-button";
import { MeDocument, PostQuery } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { CreateComment } from "../create-comment/create-comment";

type PostCommentsProps = {
  postId: number;
  comments: PostQuery["post"]["comments"];
};

export const PostComments: React.FC<PostCommentsProps> = ({
  postId,
  comments,
}) => {
  const { data, loading } = useQuery(MeDocument);

  return (
    <Container>
      {data?.me?.id ? (
        <CreateComment postId={postId} />
      ) : (
        <Link href="/auth/sign-up">
          <PrimaryButton>Add a Comment</PrimaryButton>
        </Link>
      )}
      <CommentsContainer>
        {comments.map((comment) => (
          <CommentContainer key={comment.id}>
            <Text fontSize={"xs"}>Posted by u/{comment.creator.username}</Text>
            <Text>{comment.content}</Text>
          </CommentContainer>
        ))}
      </CommentsContainer>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const CommentsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const CommentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid #eaeaea",
});
