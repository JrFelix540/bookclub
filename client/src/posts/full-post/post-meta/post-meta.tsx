import { Upvote } from "@/components/upvote/upvote";
import { PostQuery } from "@/generated/graphql";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { PostComments } from "../post-comments/post-comments";

type PostMetaProps = Omit<PostQuery["post"], "__typename">;

export const PostMeta: React.FC<PostMetaProps> = ({
  id,
  points,
  hasVoted,
  community,
  creator,
  title,
  content,
  comments,
}) => {
  return (
    <Container>
      <DetailsContainer>
        <Upvote hasVoted={hasVoted} points={points} postId={id} />
        <ContentContainer>
          <ContentHeader>
            <Text fontSize="sm">
              Posted in{" "}
              <Link href={`/club/${community.id}`}>c/{community.name}</Link> by
              u/{creator.username}
            </Text>
          </ContentHeader>
          <ContentBody>
            <Text fontSize="2xl">{title}</Text>
            <Text>{content}</Text>
          </ContentBody>
        </ContentContainer>
      </DetailsContainer>
      <PostComments postId={id} comments={comments} />
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
  gap: "5px",
});

const ContentHeader = styled("div")({
  display: "flex",
});

const ContentBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});
