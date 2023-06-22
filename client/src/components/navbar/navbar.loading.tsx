import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { MainContainer } from "../main-container/main-container";

export const NavbarLoading = () => {
  return (
    <Header>
      <Container>
        <SkeletonContainer>
          <SkeletonCircle size="10" />
          <Skeleton height="10px" width="70px" />
        </SkeletonContainer>
        <SkeletonContainer>
          <Skeleton height="40px" width="80px" />
          <Skeleton height="40px" width="80px" />
        </SkeletonContainer>
      </Container>
    </Header>
  );
};

const Header = styled("header")({
  position: "absolute",
  width: "100%",
  background: "#fff",
  padding: "20px 0",
});

const Container = styled(MainContainer)({
  display: "flex",
  justifyContent: "space-between",
});

const SkeletonContainer = styled("div")({
  display: "flex",
  gap: "2px",
  alignItems: "center",
});
