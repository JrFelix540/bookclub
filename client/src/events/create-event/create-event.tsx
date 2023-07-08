import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { LoadingPage } from "@/components/loading-page/loading-page";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { RulesSidebar } from "@/components/rules-sidebar/rules-sidebar";
import { useUser } from "@/hooks/useUser";
import { BaseLayout } from "@/layouts/base-layout";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { CreateEventForm } from "./create-event-form/create-event-form";

export const CreateEvent = () => {
  const { me, loading } = useUser({ redirect: true });

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <BaseLayout title="BookClub | Create a Bookclub Event">
      <Navbar {...me} />
      <ContentContainer>
        <FormContainer>
          <Text fontSize="2xl" fontWeight="bold">
            Create a Book Club Event
          </Text>
          <CreateEventForm />
        </FormContainer>
        <SidebarsContainer>
          <RulesSidebar />
          <ClubsSidebar />
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

const FormContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "10px 15px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "15px",
}));

const SidebarsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
