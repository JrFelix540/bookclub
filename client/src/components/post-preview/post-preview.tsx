import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Upvote } from "../upvote/upvote";
import Link from "next/link";
import { Avatar } from "../avatar/avatar";

interface PostPreviewProps {
  id: number;
  title: string;
  content: string;
  creator: string;
  points: number;
  club: { id: number; name: string };
  hasVoted: number | undefined | null;
}

export const PostPreview: React.FC<PostPreviewProps> = ({
  id,
  title,
  content,
  creator,
  points,
  club,
  hasVoted,
}) => {
  return (
    <Container>
      <Upvote hasVoted={hasVoted} points={points} postId={id} />
      <ContentSection>
        <Link href={`/posts/${id}`}>
          <Text fontSize={"2xl"}>{title}</Text>
        </Link>
        <UserProfile>
          <Avatar size="sm" value={creator} />
          <Text size="xs">
            Posted by {creator} in{" "}
            <Link href={`/clubs/${id}`}>{club.name}</Link>
          </Text>
        </UserProfile>
        <Link href={`/posts/${id}`}>
          <TextContent>{content}</TextContent>
        </Link>
      </ContentSection>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "15px",
  backgroundColor: theme.palette.background.secondary,
  padding: "10px",
  borderRadius: "15px",
}));

const ContentSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TextContent = styled(Text)({
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
  "-webkit-line-clamp": "3",
  lineClamp: "3",
});

const UserProfile = styled("div")({
  display: "flex",
  gap: "5px",
  alignItems: "center",
});
