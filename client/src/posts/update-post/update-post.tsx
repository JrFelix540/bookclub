import { Navbar } from "@/components/navbar/navbar";
import { MeDocument, PostDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { UpdatePostForm } from "./update-post-form/update-post-form";
import { RulesSidebar } from "@/components/rules-sidebar/rules-sidebar";
import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { useUser } from "@/hooks/useUser";
import { LoadingPage } from "@/components/loading-page/loading-page";

export const UpdatePost: NextPage<{ id: number }> = ({ id }) => {
  const { me, loading: meLoading } = useUser({ redirect: true });

  const { data, loading } = useQuery(PostDocument, {
    variables: { postId: id },
  });
  if (!data) {
    return loading || meLoading ? <LoadingPage /> : <ErrorPage />;
  }

  const title = data.post.title;
  return (
    <BaseLayout title={title}>
      <Navbar {...me} />
      <Container>
        <FormContainer>
          <Text fontSize="2xl" fontWeight="bold">
            Update Post
          </Text>
          <UpdatePostForm post={data.post} />
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
