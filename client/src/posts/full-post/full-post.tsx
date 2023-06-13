import { ClubSidebar } from "@/components/club-sidebar/club-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { NavBar } from "@/components/nav-bar/nav-bar";
import { MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import React from "react";
import { PostMeta } from "./post-meta/post-meta";
import { NextPage } from "next";

export const FullPost: NextPage<{ id: string }> = ({ id }) => {
  const postId = parseInt(id);
  const { data: me } = useQuery(MeDocument);
  return (
    <BaseLayout title="Post Details">
      <NavBar {...me?.me} />
      <BodyContainer>
        <ContentContainer>
          <PostMeta postId={postId} />
          <SidebarsContainer>
            <ClubSidebar clubId={postId} />
          </SidebarsContainer>
        </ContentContainer>
      </BodyContainer>
    </BaseLayout>
  );
};

const BodyContainer = styled("main")({
  minHeight: "100vh",
  backgroundColor: "gray",
  paddingTop: "120px",
});

const ContentContainer = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
});

const SidebarsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
