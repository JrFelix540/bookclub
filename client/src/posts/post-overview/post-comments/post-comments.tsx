import { MeDocument, PostCommentsDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { CreateComment } from "../create-comment/create-comment";
import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { Comment } from "@/components/comment/comment";

type PostCommentsProps = {
  postId: number;
};

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const { data } = useQuery(MeDocument);
  const { data: commentsData, loading: commentsLoading } = useQuery(
    PostCommentsDocument,
    { variables: { postId } }
  );

  if (!commentsData) {
    commentsLoading ? <p>Comments Loading</p> : <p>Could not fetch comments</p>;
  }

  return (
    <Container>
      <CommentsContainer>
        {data?.me?.id ? (
          <CreateComment postId={postId} />
        ) : (
          <AddCommentContainer>
            <Link href="/auth/sign-up">
              <SecondaryButton variant="outline">Add a Comment</SecondaryButton>
            </Link>
          </AddCommentContainer>
        )}
        {commentsData?.postComments?.length === 0 && (
          <NoCommentsContainer>
            <Text>No comments yet.</Text>
          </NoCommentsContainer>
        )}
        {commentsData?.postComments?.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            creator={comment.creator}
            isOwner={comment.isOwner}
          />
        ))}
      </CommentsContainer>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingLeft: "40px",
});

const AddCommentContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const CommentsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const NoCommentsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "150px",
  width: "100%",
});
