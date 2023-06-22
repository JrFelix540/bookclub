import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const LoadingClubSidebar = () => {
  return (
    <Container>
      <TitleContainer>
        <SkeletonCircle size="10" />
        <Skeleton width="40px" height="15px" />
      </TitleContainer>
      <SkeletonText />
      <SkeletonText />
      <SkeletonText />
    </Container>
  );
};

const Container = styled("div")({
  backgroundColor: "#fff",
  padding: "20px 10px",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
});
