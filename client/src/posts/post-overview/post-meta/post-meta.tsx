import { Avatar } from "@/components/avatar/avatar";
import { Upvote } from "@/components/upvote/upvote";
import { MeDocument, PostQuery } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { PostComments } from "../post-comments/post-comments";
import { PostDelete } from "../post-delete/post-delete";

type PostMetaProps = Omit<PostQuery["post"], "__typename">;

export const PostMeta: React.FC<PostMetaProps> = ({
  id,
  points,
  hasVoted,
  club,
  creator,
  title,
  content,
}) => {
  const { data } = useQuery(MeDocument);
  const isOwner = creator.id === data?.me?.id;
  return (
    <Container>
      <DetailsContainer>
        <Upvote hasVoted={hasVoted} points={points} postId={id} />
        <ContentContainer>
          <ContentBody>
            <Text fontSize="2xl">{title}</Text>
            <Text>{content}</Text>
            <UserProfile>
              <Avatar size="xs" value={creator.username} />
              <Text fontSize="xs">
                Posted by {creator.username} in{" "}
                <Link href={`/clubs/${club.id}`}>{club.name}</Link>
              </Text>
            </UserProfile>
            {isOwner && (
              <Flex justifyContent="flex-end" alignItems="center">
                <PostDelete id={id} clubId={club.id} />
              </Flex>
            )}
          </ContentBody>
        </ContentContainer>
      </DetailsContainer>
      <PostComments postId={id} />
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
