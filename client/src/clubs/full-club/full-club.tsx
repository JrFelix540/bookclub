import { MainContainer } from "@/components/main-container/main-container";
import { NavBar } from "@/components/nav-bar/nav-bar";
import { CommunityDocument, MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ClubPosts } from "./club-posts";
import { ClubSidebar } from "@/components/club-sidebar/club-sidebar";
import { NextPage } from "next";
import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { Text } from "@chakra-ui/react";

export const FullClub: NextPage<{ id: string }> = ({ id }) => {
  const communityId = parseInt(id);
  const { data: meData, loading: meLoading } = useQuery(MeDocument);
  const { data: communityData, loading: communityLoading } = useQuery(
    CommunityDocument,
    { variables: { communityId } }
  );
  const title = `BookClub | ${communityData?.community.name}` || "";
  const isMember = communityData?.community.memberIds.find(
    (id) => id === meData?.me?.id
  );

  return (
    <BaseLayout title={title}>
      <NavBar {...meData?.me} />
      <BodyContainer>
        <Content>
          <PostsContainer>
            <ClubTitle>
              <Text fontSize="3xl">c/{communityData?.community.name}</Text>
            </ClubTitle>
            <ClubPosts
              club={{
                id: communityData?.community.id as number,
                name: communityData?.community.name || "",
              }}
            />
          </PostsContainer>

          <SidebarsContainer>
            <ClubSidebar clubId={communityId} />
            <ClubsSidebar />
          </SidebarsContainer>
        </Content>
      </BodyContainer>
    </BaseLayout>
  );
};

const BodyContainer = styled("div")({
  minHeight: "100vh",
  backgroundColor: "gray",
  paddingTop: "120px",
});

const Content = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
});

const SidebarsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const ClubTitle = styled("div")({
  backgroundColor: "#fff",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
});

const PostsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
