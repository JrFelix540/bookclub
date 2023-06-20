import { ClubSidebar } from "@/components/club-sidebar/club-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { NavBar } from "@/components/nav-bar/nav-bar";
import { MeDocument, PostDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import React from "react";
import { PostMeta } from "./post-meta/post-meta";
import { NextPage } from "next";
import { ErrorPage } from "@/layouts/error";
import { PostLoading } from "./post-loading/post-loading";

export const FullPost: NextPage<{ id: number }> = ({ id }) => {
  const { data: me } = useQuery(MeDocument);
  const {
    data: postData,
    error,
    loading,
  } = useQuery(PostDocument, {
    variables: { postId: id },
  });

  if (!postData) {
    return loading ? <PostLoading /> : <ErrorPage />;
  }

  const title = postData.post.title;
  return (
    <BaseLayout title={title}>
      <NavBar {...me?.me} />
      <BodyContainer>
        <ContentContainer>
          <PostMeta
            id={postData.post.id}
            title={postData.post.title}
            content={postData.post.content}
            community={postData.post.community}
            comments={postData.post.comments}
            creator={postData.post.creator}
            isOwner={postData.post.isOwner}
            joinStatus={postData.post.joinStatus}
            points={postData.post.points}
            hasVoted={postData.post.hasVoted}
          />
          <SidebarsContainer>
            <ClubSidebar
              id={postData.post.community.id}
              name={postData.post.community.name}
              dateCreated={postData.post.community.dateCreated}
              description={postData.post.community.description}
              hasJoined={postData.post.joinStatus}
            />
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
