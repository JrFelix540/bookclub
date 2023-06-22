import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Upvote } from "../upvote/upvote";
import Link from "next/link";

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
        <Text fontSize="sm">
          Posted in c/<Link href={`/clubs/${club.id}`}>{club.name}</Link> by u/
          {creator}
        </Text>
        <Link href={`/posts/${id}`}>
          <Text fontSize={"2xl"}>{title}</Text>
          <TextContent>{content}</TextContent>
        </Link>
      </ContentSection>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  gap: "15px",
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "15px",
});

const ContentSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const TextContent = styled(Text)({
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
  "-webkit-line-clamp": "2",
  lineClamp: "2",
});
