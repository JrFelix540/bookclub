import { PostOverview } from "@/posts/post-overview/post-overview";
import { GetServerSideProps } from "next";

export default PostOverview;

export const getServerSideProps: GetServerSideProps<{ id: number }> = async ({
  params,
}) => {
  const { id } = params as { id: string };

  return {
    props: {
      id: parseFloat(id),
    },
  };
};
