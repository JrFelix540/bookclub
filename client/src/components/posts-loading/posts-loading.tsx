import { PostPreviewLoading } from "@/components/post-preview/post-preview.loading";
import styled from "@emotion/styled";

export const PostsLoading = () => {
  return (
    <PostsContainer>
      <PostPreviewLoading />
      <PostPreviewLoading />
      <PostPreviewLoading />
    </PostsContainer>
  );
};

const PostsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
