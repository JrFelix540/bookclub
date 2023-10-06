import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

export const LandingEmptyPosts = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Image src="/no-posts.png" height={200} width={281} alt="no posts" />
      <Text align="center">{children}</Text>
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
