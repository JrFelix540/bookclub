import { Skeleton, SkeletonText } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const ClubsSidebarLoading = () => {
  return (
    <Container>
      <Skeleton height="25px" width="100%" />
      <ClubContainer>
        <Skeleton height="35px" width="35px" />
        <SkeletonText width={"69%"} noOfLines={1} />
      </ClubContainer>
      <ClubContainer>
        <Skeleton height="35px" width="35px" />
        <SkeletonText width={"69%"} noOfLines={1} />
      </ClubContainer>
      <ClubContainer>
        <Skeleton height="35px" width="35px" />
        <SkeletonText width={"69%"} noOfLines={1} />
      </ClubContainer>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  background: theme.palette.background.secondary,
  padding: "10px 15px",
  borderRadius: "15px",
  width: "100%",
}));

const ClubContainer = styled("div")({
  display: "flex",
  gap: "5px",
  alignItems: "center",
});
