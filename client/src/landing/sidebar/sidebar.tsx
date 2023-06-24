import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { Button, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

export const SideBar = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <Text>Home</Text>
      </ImageContainer>
      <Text>
        Welcome to your personalized feed! Here, you will find the content from
        Bookclubs you like. Carry on :)
      </Text>
      <ButtonsContainer>
        <Link href="/posts/create">
          <SecondaryButton w="100%">Create Post</SecondaryButton>
        </Link>
        <Link href="/clubs/create">
          <SecondaryButton w="100%" variant="outline" color="inherit">
            Create Bookclub
          </SecondaryButton>
        </Link>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  padding: "10px 15px",
  borderRadius: "15px",
  backgroundColor: theme.palette.background.secondary,
}));

const ImageContainer = styled("div")({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  justifyContent: "center",
});

const ButtonsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
