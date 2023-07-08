import { ClubSidebarLoading } from "@/components/club-sidebar/club-sidebar.loading";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { BaseLayout } from "@/layouts/base-layout";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const PostLoading = () => {
  return (
    <BaseLayout title="Bookclub">
      <Navbar loading={true} />
      <ContentContainer>
        <PostContainer>
          <PostMeta>
            <Skeleton height="15px" width="60%" />
            <Skeleton height="250px" width="100%" />
            <Skeleton height="30px" width="70px" alignSelf="flex-end" />
          </PostMeta>
          <PostComments>
            <Comment>
              <SkeletonText noOfLines={1} />
              <Skeleton height="50px" width="100%" />
            </Comment>
            <Comment>
              <SkeletonText noOfLines={1} />
              <Skeleton height="50px" width="100%" />
            </Comment>
          </PostComments>
        </PostContainer>
        <SidebarsContainer>
          <ClubSidebarLoading />
        </SidebarsContainer>
      </ContentContainer>
    </BaseLayout>
  );
};

const ContentContainer = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "35px",
  padding: "20px 0",
});

const PostContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "10px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "15px",
}));

const PostMeta = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "100%",
});

const PostComments = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "100%",
});

const Comment = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
});

const SidebarsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
