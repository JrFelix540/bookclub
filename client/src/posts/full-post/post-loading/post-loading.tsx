import { LoadingClubSidebar } from "@/components/club-sidebar/club-sidebar.loading";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { BaseLayout } from "@/layouts/base-layout";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const PostLoading = () => {
  return (
    <BaseLayout title="Bookclub">
      <Navbar loading={true} />
      <BodyContainer>
        <ContentContainer>
          <PostContainer>
            <PostMeta>
              <Skeleton height="10px" width="400px" />
              <Skeleton height="15px" width="400px" />
              <SkeletonText noOfLines={5} spacing={2} />
              <Skeleton height="30px" width="70px" />
            </PostMeta>
            <PostComments>
              <Comment>
                <SkeletonText />
                <SkeletonText noOfLines={3} />
              </Comment>
              <Comment>
                <SkeletonText />
                <SkeletonText noOfLines={3} />
              </Comment>
            </PostComments>
          </PostContainer>
          <SidebarsContainer>
            <LoadingClubSidebar />
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
  gap: "35px",
});

const PostContainer = styled("div")({
  backgroundColor: "#fff",
  padding: "10px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "15px",
});
const PostMeta = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const PostComments = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const Comment = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid #eaeaea",
});

const SidebarsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const SidebarLoading = styled("div")({});
