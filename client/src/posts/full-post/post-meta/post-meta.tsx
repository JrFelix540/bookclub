import { Upvote } from "@/components/upvote/upvote";
import { PostDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { PostComments } from "../post-comments/post-comments";

export const PostMeta: React.FC<{ postId: number }> = ({ postId }) => {
  const { data, loading } = useQuery(PostDocument, { variables: { postId } });

  return (
    <Container>
      <DetailsContainer>
        <Upvote
          hasVoted={data?.post.hasVoted}
          points={data?.post?.points}
          postId={postId}
        />
        <ContentContainer>
          <ContentHeader>
            <Text fontSize="sm">
              Posted in{" "}
              <Link href={`/club/${data?.post?.community.id}`}>
                c/{data?.post?.community.name}
              </Link>{" "}
              by u/{data?.post?.creator.username}
            </Text>
          </ContentHeader>
          <ContentBody>
            <Text fontSize="2xl">{data?.post?.title}</Text>
            <Text>{data?.post?.content}</Text>
            <PostComments postId={postId} />
          </ContentBody>
        </ContentContainer>
      </DetailsContainer>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: "#fff",
  padding: "10px 20px",
  borderRadius: "10px",
  marginBottom: "10px",
});

const DetailsContainer = styled("div")({
  display: "flex",
  gap: "15px",
});

const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const ContentHeader = styled("div")({
  display: "flex",
});

const ContentBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});
