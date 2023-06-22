import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { CommunityDocument, MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ClubPosts } from "./club-posts";
import { ClubSidebar } from "@/components/club-sidebar/club-sidebar";
import { NextPage } from "next";
import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { Text } from "@chakra-ui/react";
import { ClubLoading } from "./club-loading";
import { ErrorPage } from "@/layouts/error";

export const FullClub: NextPage<{ id: number }> = ({ id }) => {
  const { data: meData, loading: meLoading } = useQuery(MeDocument);
  const { data: communityData, loading: communityLoading } = useQuery(
    CommunityDocument,
    { variables: { communityId: id } }
  );

  if (!communityData) {
    return communityLoading ? <ClubLoading /> : <ErrorPage />;
  }

  const title = `${communityData.community.name}` || "";
  const description = `${communityData.community.name}: ${communityData.community.description}`;

  return (
    <BaseLayout title={title} description={description}>
      <Navbar loading={meLoading} {...meData?.me} />
      <BodyContainer>
        <Content>
          <PostsContainer>
            <ClubTitle>
              <Text fontSize="3xl">c/{communityData?.community.name}</Text>
            </ClubTitle>
            <ClubPosts
              club={{
                id: communityData.community.id as number,
                name: communityData.community.name || "",
              }}
            />
          </PostsContainer>

          <SidebarsContainer>
            <ClubSidebar
              id={communityData.community.id}
              name={communityData.community.name}
              dateCreated={communityData.community.dateCreated}
              description={communityData.community.description}
              hasJoined={communityData.community.hasJoined}
            />
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
