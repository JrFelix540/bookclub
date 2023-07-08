import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { LoadingPage } from "@/components/loading-page/loading-page";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { RulesSidebar } from "@/components/rules-sidebar/rules-sidebar";
import { ClubEventDocument } from "@/generated/graphql";
import { useUser } from "@/hooks/useUser";
import { BaseLayout } from "@/layouts/base-layout";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { EditEventForm } from "./edit-event-form/edit-event-form";

export const EditEvent: NextPage<{ id: number }> = ({ id }) => {
  const { me, loading: meLoading } = useUser({ redirect: true });

  const { data, loading } = useQuery(ClubEventDocument, {
    variables: { clubEventId: id },
  });

  if (!data) {
    return loading || meLoading ? <LoadingPage /> : <ErrorPage />;
  }
  return (
    <BaseLayout title="">
      <Navbar loading={meLoading} {...me} />
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
