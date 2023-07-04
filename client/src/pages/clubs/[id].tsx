import { ClubOverview } from "@/clubs/club-overview/club-overview";
import { GetServerSideProps } from "next";

export default ClubOverview;
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
