import { Grid } from "@chakra-ui/react";
import { NavbarLoading } from "../navbar/navbar.loading";
import { PostsLoading } from "../posts-loading/posts-loading";
import { ClubSidebarLoading } from "../club-sidebar/club-sidebar.loading";
import { MainContainer } from "../main-container/main-container";
import styled from "@emotion/styled";
import { breakpoint } from "@/theme/theme";
import Head from "next/head";

export const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>Bookclub | Loading</title>
      </Head>
      <NavbarLoading />
      <MainContainer>
        <GridContainer>
          <PostsLoading />
          <SidebarsContainer>
            <ClubSidebarLoading />
          </SidebarsContainer>
        </GridContainer>
      </MainContainer>
    </>
  );
};

const GridContainer = styled(Grid)({
  gridTemplateColumns: "1fr",
  paddingTop: "20px",
  gap: "20px",
  [breakpoint("lg")]: {
    gridTemplateColumns: "2fr 1fr",
  },
});

const SidebarsContainer = styled("div")({
  display: "none",
  [breakpoint("lg")]: {
    display: "block",
  },
});
