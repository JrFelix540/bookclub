import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const PostPreviewLoading = () => {
  return (
    <Container>
      <SkeletonContainer>
        <Skeleton height="15px" width="550px" />
        <Skeleton height="250px" width="100%" />
        <SkeletonCircle />
      </SkeletonContainer>
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

const SkeletonContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
});
