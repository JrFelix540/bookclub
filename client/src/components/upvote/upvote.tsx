import { VoteDocument, VoteMutation } from "@/generated/graphql";
import { ApolloCache, gql, useMutation } from "@apollo/client";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { updateAfterVote } from "./upvote.utils";

interface UpvoteProps {
  hasVoted: number | null | undefined;
  points: number;
  postId: number;
}

export const Upvote: React.FC<UpvoteProps> = ({ hasVoted, points, postId }) => {
  const [vote] = useMutation(VoteDocument);
  const handleUpvote = async () => {
    await vote({
      variables: { postId, value: 1 },
      update: (cache) => {
        updateAfterVote(1, postId, cache);
      },
    });
  };

  const handleDownVote = async () => {
    await vote({
      variables: { postId, value: -1 },
      update: (cache) => {
        updateAfterVote(-1, postId, cache);
      },
    });
  };

  return (
    <Container>
      <IconButton
        aria-label="upvote"
        icon={
          <TriangleUpIcon color={hasVoted === 1 ? "blue.900" : "gray.300"} />
        }
        onClick={handleUpvote}
        variant="ghost"
      />
      {points}
      <IconButton
        aria-label="downvote"
        icon={
          <TriangleDownIcon color={hasVoted === -1 ? "red.500" : "gray.300"} />
        }
        variant="ghost"
        onClick={handleDownVote}
      />
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
});
