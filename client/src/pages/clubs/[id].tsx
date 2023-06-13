import { FullClub } from "@/clubs/full-club/full-club";
import { CommunityDocument } from "@/generated/graphql";
import {
  addApolloState,
  initializeApollo,
} from "@/providers/apollo/apollo-client";
import { GetServerSideProps } from "next";

export default FullClub;

export const getServerSideProps: GetServerSideProps<{ id: string }> = async ({
  params,
}) => {
  const { id } = params as { id: string };
  const communityId = id;
  const client = initializeApollo();
  await client.query({
    query: CommunityDocument,
    variables: {
      communityId: parseInt(communityId),
    },
  });

  return addApolloState(client, {
    props: {
      id: communityId,
    },
  });
};
