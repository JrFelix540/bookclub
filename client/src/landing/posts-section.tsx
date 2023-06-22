import { PostPreview } from "@/components/post-preview/post-preview";
import {
  FeedPostsDocument,
  FeedPostsQuery,
  PostsDocument,
  PostsQuery,
} from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { EmptyPosts } from "./empty-posts";
import { PostsLoading } from "./posts-loading";

interface Post {
  id: number;
  content: string;
  title: string;
  points: number;
  community: {
    id: number;
    name: string;
  };
  creator: {
    username: string;
  };
  hasVoted: number;
}

export const PostsSection: React.FC = () => {
  const [feed, setFeed] = React.useState<"guest" | "user">("guest");
  const query: any = feed === "user" ? FeedPostsDocument : PostsDocument;
  const { data, loading } = useQuery(query, {
    variables: { limit: 10 },
  });

  if (loading) {
    return <PostsLoading />;
  }

  let renderedPosts: PostsQuery["posts"]["posts"];

  if (feed === "user") {
    renderedPosts = data.myCommunitiesPosts?.posts || [];
  } else {
    renderedPosts = data.posts.posts;
  }

  const isPostsEmpty =
    renderedPosts?.length === 0 || renderedPosts === undefined;

  return (
    <Container>
      <PostsHeading>
        <StyledButton
          variant={feed === "user" ? "solid" : "ghost"}
          onClick={() => setFeed("user")}
        >
          <Image src="/feed.png" alt="feed" width={15} height={15} />
          My Feed
        </StyledButton>
        <StyledButton
          variant={feed === "guest" ? "solid" : "ghost"}
          onClick={() => setFeed("guest")}
        >
          <Image src="/rocket.png" alt="explore" width={15} height={15} />
          Explore
        </StyledButton>
      </PostsHeading>
      <PostsContainer>
        {isPostsEmpty && <EmptyPosts />}
        {renderedPosts?.map((post) => (
          <PostPreview
            id={post.id}
            club={post.community}
            content={post.content}
            creator={post.creator.username}
            points={post.points}
            title={post.title}
            key={post.id}
            hasVoted={post.hasVoted}
          />
        ))}
      </PostsContainer>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const PostsHeading = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  display: "flex",
  gap: "15px",
});

const StyledButton = styled(Button)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});

const PostsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
