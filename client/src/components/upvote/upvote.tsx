import { MeDocument, VoteDocument, VoteMutation } from "@/generated/graphql";
import { ApolloCache, gql, useMutation, useQuery } from "@apollo/client";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { updateAfterVote } from "./upvote.utils";
import { useRouter } from "next/router";

interface UpvoteProps {
  hasVoted: number | null | undefined;
  points: number;
  postId: number;
}

export const Upvote: React.FC<UpvoteProps> = ({ hasVoted, points, postId }) => {
  const router = useRouter();
  const { data } = useQuery(MeDocument);

  const [vote] = useMutation(VoteDocument);
  const handleUpvote = async () => {
    if (!data?.me) {
      router.push("/auth/sign-up");
    }
    await vote({
      variables: { postId, value: 1 },
      update: (cache) => {
        updateAfterVote(1, postId, cache);
      },
    });
  };

  const handleDownVote = async () => {
    if (!data?.me) {
      router.push("/auth/sign-up");
    }
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
