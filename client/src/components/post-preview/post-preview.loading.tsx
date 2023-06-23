import { Skeleton, SkeletonText } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const LoadingPostPreview = () => {
  return (
    <Container>
      <PostMeta>
        <Skeleton height="10px" width="550px" />
        <Skeleton height="15px" width="550px" />
        <SkeletonText noOfLines={3} width="650px" />
      </PostMeta>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "15px",
  backgroundColor: theme.palette.background.secondary,
  padding: "10px",
  borderRadius: "15px",
}));

const PostMeta = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
