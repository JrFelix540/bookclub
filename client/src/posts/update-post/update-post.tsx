import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { LoadingPage } from "@/components/loading-page/loading-page";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { RulesSidebar } from "@/components/rules-sidebar/rules-sidebar";
import { PostDocument } from "@/generated/graphql";
import { useUser } from "@/hooks/useUser";
import { BaseLayout } from "@/layouts/base-layout";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { UpdatePostForm } from "./update-post-form/update-post-form";
import { breakpoint } from "@/theme/theme";

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
        <Flex
          direction="column"
          gap="10px"
          display={{ base: "none", lg: "flex" }}
        >
          <RulesSidebar />
          <ClubsSidebar />
        </Flex>
      </Container>
    </BaseLayout>
  );
};
const Container = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  paddingTop: "20px",
  [breakpoint("sm")]: {
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
