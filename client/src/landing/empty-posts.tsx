import { MeDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

export const EmptyPosts = () => {
  const { data } = useQuery(MeDocument);

  return (
    <Container>
      <Content>
        <Image src="/no-posts.png" height={200} width={281} alt="no posts" />
        {data?.me ? (
          <Text textAlign="center">
            Oops? It seems that your subscribed bookclubs have no posts yet! Try
            our explore page.
          </Text>
        ) : (
          <Text textAlign="center">
            It seems like you&apos;re not logged in! Login to get a customized
            feed with all your favorite bookclubs.
          </Text>
        )}
      </Content>
    </Container>
  );
};

const Container = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "15px",
  display: "flex",
});

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  justifyContent: "center",
  alignItems: "center",
});
