import { Grid } from "@chakra-ui/react";
import { NavbarLoading } from "../navbar/navbar.loading";
import { PostsLoading } from "../posts-loading/posts-loading";
import { ClubSidebarLoading } from "../club-sidebar/club-sidebar.loading";
import { MainContainer } from "../main-container/main-container";

export const LoadingPage = () => {
  return (
    <>
      <NavbarLoading />
      <MainContainer>
        <Grid templateColumns={"2fr 1fr"} paddingTop="20px" gap="20px">
          <PostsLoading />
          <div>
            <ClubSidebarLoading />
          </div>
        </Grid>
      </MainContainer>
    </>
  );
};
