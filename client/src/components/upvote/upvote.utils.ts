import { VoteMutation } from "@/generated/graphql";
import { ApolloCache, gql } from "@apollo/client";

export const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>,
  loggedIn: boolean
) => {
  if (!loggedIn) {
    return;
  }
  const data = cache.readFragment<{
    id: number;
    points: number;
    hasVoted: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        hasVoted
      }
    `,
  });

  if (data) {
    if (data.hasVoted === value) {
      return;
    }

    const newPoints =
      (data.points as number) + (!data.hasVoted ? 1 : 2) * value;

    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          hasVoted
        }
      `,
      data: { points: newPoints, hasVoted: value },
    });
  }
};
