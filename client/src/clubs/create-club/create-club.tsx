import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { RulesSidebar } from "@/components/rules-sidebar/rules-sidebar";
import { MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { CreateClubForm } from "./create-club-form/create-club-form";
import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";

export const CreateClub = () => {
  const { data, loading } = useQuery(MeDocument);
  return (
    <BaseLayout title="BookClub | Create a Club">
      <Navbar loading={loading} {...data?.me} />
      <ContentContainer>
        <FormContainer>
          <Text fontSize="2xl" fontWeight="bold">
            Create a Book Club
          </Text>
          <CreateClubForm />
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
