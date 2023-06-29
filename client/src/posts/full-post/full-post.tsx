import { ClubSidebar } from "@/components/club-sidebar/club-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { MeDocument, PostDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { PostLoading } from "./post-loading/post-loading";
import { PostMeta } from "./post-meta/post-meta";

export const FullPost: NextPage<{ id: number }> = ({ id }) => {
  const { data: me, loading: meLoading } = useQuery(MeDocument);
  const { data: postData, loading } = useQuery(PostDocument, {
    variables: { postId: id },
  });

  if (!postData) {
    return loading ? <PostLoading /> : <ErrorPage />;
  }

  const title = postData.post.title;
  return (
    <BaseLayout title={title}>
      <Navbar loading={meLoading} {...me?.me} />
      <ContentContainer>
        <PostMeta
          id={postData.post.id}
          title={postData.post.title}
          content={postData.post.content}
          club={postData.post.club}
          creator={postData.post.creator}
          isOwner={postData.post.isOwner}
          joinStatus={postData.post.joinStatus}
          points={postData.post.points}
          hasVoted={postData.post.hasVoted}
        />
        <SidebarsContainer>
          <ClubSidebar
            id={postData.post.club.id}
            name={postData.post.club.name}
            dateCreated={postData.post.club.dateCreated}
            description={postData.post.club.description}
            hasJoined={postData.post.joinStatus}
          />
        </SidebarsContainer>
      </ContentContainer>
    </BaseLayout>
  );
};

const ContentContainer = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  paddingTop: "20px",
});

const SidebarsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
