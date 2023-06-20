import { FullClub } from "@/clubs/full-club/full-club";
import { GetServerSideProps } from "next";

export default FullClub;

export const getServerSideProps: GetServerSideProps<{ id: number }> = async ({
  params,
}) => {
  const { id } = params as { id: string };
  const communityId = parseFloat(id);

  return {
    props: {
      id: communityId,
    },
  };
};
