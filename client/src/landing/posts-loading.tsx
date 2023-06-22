import { LoadingPostPreview } from "@/components/post-preview/post-preview.loading";
import { Skeleton } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const PostsLoading = () => {
  return (
    <Container>
      <PostsHeading>
        <Skeleton height="35px" width="70px" />
        <Skeleton height="35px" width="70px" />
      </PostsHeading>
      <PostsContainer>
        <LoadingPostPreview />
        <LoadingPostPreview />
        <LoadingPostPreview />
      </PostsContainer>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const PostsHeading = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  display: "flex",
  gap: "15px",
});

const PostsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
