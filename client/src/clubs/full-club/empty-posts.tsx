import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

export const EmptyPosts = () => {
  return (
    <Container>
      <Image
        src="/no-community-posts.png"
        height={200}
        width={281}
        alt="no posts"
      />
      <Text textAlign="center">
        Oops! It seems that this bookclub has no posts yet.
      </Text>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "20px",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  justifyContent: "center",
  alignItems: "center",
}));

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  justifyContent: "center",
  alignItems: "center",
});
