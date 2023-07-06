import { UpdatePost } from "@/posts/update-post/update-post";
import { GetServerSideProps } from "next";

export default UpdatePost;

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
