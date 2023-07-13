import { LoadingPage } from "@/components/loading-page/loading-page";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { useUser } from "@/hooks/useUser";
import { BaseLayout } from "@/layouts/base-layout";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { CreatePostForm } from "./create-post-form/create-post-form";
import { CreatePostSidebar } from "./create-post-sidebar/create-post-sidebar";
import { breakpoint } from "@/theme/theme";

export const CreatePost: React.FC = () => {
  const { me, loading } = useUser({ redirect: true });
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <BaseLayout title="BookClub | Create Post">
      <Navbar {...me} />
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
  gridTemplateColumns: " 1fr",
  gap: "20px",
  paddingTop: "20px",
  [breakpoint("lg")]: {
    gridTemplateColumns: "2fr 1fr",
  },
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
  display: "none",
  flexDirection: "column",
  gap: "10px",
  [breakpoint("lg")]: {
    display: "flex",
  },
});
