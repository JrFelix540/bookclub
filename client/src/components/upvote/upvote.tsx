import { MeDocument, VoteDocument } from "@/generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { updateAfterVote } from "./upvote.utils";

interface UpvoteProps {
  hasVoted: number | null | undefined;
  points: number;
  postId: number;
  align?: "horizontal" | "vertical";
}

export const Upvote: React.FC<UpvoteProps> = ({
  hasVoted,
  points,
  postId,
  align,
}) => {
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
    <Container align={align}>
      <IconButton
        aria-label="upvote"
        icon={<TriangleUpIcon color={hasVoted === 1 ? "#FF4401" : "#C5D0E6"} />}
        onClick={handleUpvote}
        variant="ghost"
      ></IconButton>
      {points}
      <IconButton
        aria-label="downvote"
        icon={
          <TriangleDownIcon color={hasVoted === -1 ? "blue.900" : "#C5D0E6"} />
        }
        variant="ghost"
        onClick={handleDownVote}
      />
    </Container>
  );
};

const Container = styled("div")<{ align: UpvoteProps["align"] }>(
  ({ align }) => ({
    display: "flex",
    flexDirection: align === "horizontal" ? "row" : "column",
    alignItems: "center",
    gap: "5px",
  })
);
