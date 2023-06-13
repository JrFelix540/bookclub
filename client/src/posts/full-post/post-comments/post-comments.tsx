import { MeDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { CreateComment } from "../create-comment/create-comment";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { Comment } from "../comment/comment";

interface PostCommentsProps {
  postId: number;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
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
        <Comment />
        <Comment />
        <Comment />
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
