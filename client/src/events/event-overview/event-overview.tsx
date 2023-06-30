import { ClubSidebar } from "@/components/club-sidebar/club-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { ClubEventDocument, MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";

export const EventOverview: NextPage<{ id: number }> = ({ id }) => {
  const { data, loading } = useQuery(ClubEventDocument, {
    variables: { clubEventId: id },
  });
  const { data: meData, loading: meLoading } = useQuery(MeDocument);

  if (!data) {
    return loading ? <p>Loading Event</p> : <ErrorPage />;
  }

  const title = data.clubEvent.title;
  const description = data.clubEvent.description;
  return (
    <BaseLayout title={title} description={description}>
      <Navbar {...meData?.me} loading={meLoading} />
      <Container>
        <EventTitle>
          <Text>{data.clubEvent.title}</Text>
        </EventTitle>
        <SidebarsContainer>
          <ClubSidebar
            id={data.clubEvent.club.id}
            name={data.clubEvent.club.name}
            dateCreated={data.clubEvent.club.dateCreated}
            description={data.clubEvent.club.description}
            hasJoined={data.clubEvent.club.hasJoined}
          />
        </SidebarsContainer>
      </Container>
    </BaseLayout>
  );
};

const Container = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
  paddingTop: "20px",
});

const EventTitle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "15px",
}));

const SidebarsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
