import { Tab } from "@/components/tab/tab";
import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { LatestPosts } from "../latest-posts/latest-posts";
import { PopularPosts } from "../popular-posts/popular-posts";
import { SubscribedPosts } from "../subscribed-posts/subscribed-posts";

export const PostsSection: React.FC = () => {
  const [feed, setFeed] = React.useState<"popular" | "latest" | "joined">(
    "popular"
  );
  return (
    <Container>
      <PostsHeading>
        <Tab selected={feed === "latest"} onClick={() => setFeed("latest")}>
          <Image src="/latest-posts.png" alt="feed" width={25} height={25} />
          Newest
        </Tab>
        <Tab selected={feed === "popular"} onClick={() => setFeed("popular")}>
          <Image src="/trending-posts.png" alt="feed" width={25} height={25} />
          Popular
        </Tab>

        <Tab selected={feed === "joined"} onClick={() => setFeed("joined")}>
          <Image src="/joined-clubs.png" alt="explore" width={15} height={15} />
          Joined Clubs
        </Tab>
      </PostsHeading>
      <PostsContainer>
        {feed === "popular" && <PopularPosts />}
        {feed === "latest" && <LatestPosts />}
        {feed === "joined" && <SubscribedPosts />}
      </PostsContainer>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const PostsHeading = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "20px",
  display: "flex",
  gap: "15px",
  borderRadius: "15px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  color: theme.palette.white,
}));

const PostsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
