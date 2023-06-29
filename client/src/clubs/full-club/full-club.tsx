import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { ClubDocument, MeDocument } from "@/generated/graphql";
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
  const { data: clubData, loading: clubLoading } = useQuery(ClubDocument, {
    variables: { clubId: id },
  });

  if (!clubData) {
    return clubLoading ? <ClubLoading /> : <ErrorPage />;
  }

  const title = `${clubData.club.name}` || "";
  const description = `${clubData.club.name}: ${clubData.club.description}`;

  return (
    <BaseLayout title={title} description={description}>
      <Navbar loading={meLoading} {...meData?.me} />
      <Content>
        <PostsContainer>
          <ClubTitle>
            <Text fontSize="3xl">c/{clubData?.club.name}</Text>
          </ClubTitle>
          <ClubPosts
            club={{
              id: clubData.club.id as number,
              name: clubData.club.name || "",
            }}
          />
        </PostsContainer>

        <SidebarsContainer>
          <ClubSidebar
            id={clubData.club.id}
            name={clubData.club.name}
            dateCreated={clubData.club.dateCreated}
            description={clubData.club.description}
            hasJoined={clubData.club.hasJoined}
          />
          <ClubsSidebar />
        </SidebarsContainer>
      </Content>
    </BaseLayout>
  );
};

const Content = styled(MainContainer)({
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

const ClubTitle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "15px",
}));

const PostsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
