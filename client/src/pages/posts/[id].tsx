import { FullPost } from "@/posts/full-post/full-post";
import { GetServerSideProps } from "next";

export default FullPost;

export const getServerSideProps: GetServerSideProps<{ id: string }> = async ({
  params,
}) => {
  const { id } = params as { id: string };

  return {
    props: {
      id,
    },
  };
};
