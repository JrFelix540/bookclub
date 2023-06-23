import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { CreatePostForm } from "./create-post-form/create-post-form";
import { Text } from "@chakra-ui/react";
import { CreatePostSidebar } from "./create-post-sidebar/create-post-sidebar";

export const CreatePost: React.FC = () => {
  const { data, loading } = useQuery(MeDocument);
  return (
    <BaseLayout title="BookClub | Create Post">
      <Navbar {...data?.me} loading={loading} />
      <ContentContainer>
        <FormContainer>
          <Text fontSize="2xl" fontWeight="bold">
            Create a Post
          </Text>
          <CreatePostForm />
        </FormContainer>
        <SidebarsContainer>
          <CreatePostSidebar />
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
