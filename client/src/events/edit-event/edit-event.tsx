import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { RulesSidebar } from "@/components/rules-sidebar/rules-sidebar";
import { ClubEventDocument, MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { EditEventForm } from "./edit-event-form/edit-event-form";

export const EditEvent: NextPage<{ id: number }> = ({ id }) => {
  const { data, loading } = useQuery(ClubEventDocument, {
    variables: { clubEventId: id },
  });
  const { data: meData, loading: meLoading } = useQuery(MeDocument);
  if (!data) {
    return loading ? <p>Loading</p> : <ErrorPage />;
  }
  return (
    <BaseLayout title="">
      <Navbar loading={meLoading} {...meData?.me} />
      <Container>
        <FormContainer>
          <Text fontSize="2xl" fontWeight="bold">
            Edit Event
          </Text>
          <EditEventForm event={data.clubEvent} />
        </FormContainer>
        <Flex direction="column" gap="10px">
          <RulesSidebar />
          <ClubsSidebar />
        </Flex>
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

const FormContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "10px 15px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "15px",
}));