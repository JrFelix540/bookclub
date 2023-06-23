import { Upvote } from "@/components/upvote/upvote";
import { PostQuery } from "@/generated/graphql";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { PostComments } from "../post-comments/post-comments";
import { Avatar } from "@/components/avatar/avatar";

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
          <ContentBody>
            <Text fontSize="2xl">{title}</Text>
            <UserProfile>
              <Avatar size="sm" value={creator.username} />
              <Text size="xs">
                Posted by {creator.username} in{" "}
                <Link href={`/clubs/${id}`}>{community.name}</Link>
              </Text>
            </UserProfile>
            <Text>{content}</Text>
          </ContentBody>
        </ContentContainer>
      </DetailsContainer>
      <PostComments postId={id} comments={comments} />
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: theme.palette.background.secondary,
  padding: "10px 20px",
  borderRadius: "10px",
  marginBottom: "10px",
}));

const DetailsContainer = styled("div")({
  display: "flex",
  gap: "15px",
});

const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const ContentBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const UserProfile = styled("div")({
  display: "flex",
  gap: "5px",
  alignItems: "center",
});
