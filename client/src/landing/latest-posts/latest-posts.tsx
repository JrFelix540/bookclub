import { PostPreview } from "@/components/post-preview/post-preview";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { LatestPostsDocument } from "@/generated/graphql";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { LandingEmptyPosts } from "../empty-posts/empty-posts";

export const LatestPosts = () => {
  const { data, error, loading, fetchMore } = useQuery(LatestPostsDocument, {
    variables: { limit: 10 },
  });
  if (error) {
    return <ErrorPage />;
  }

  if (!data) {
    return loading ? <PostsLoading /> : <ErrorPage />;
  }
  return (
    <>
      {data.latestPosts.posts.length === 0 && (
        <LandingEmptyPosts>There are no posts currently</LandingEmptyPosts>
      )}
      {data.latestPosts?.posts?.map((post) => (
        <PostPreview
          id={post.id}
          club={post.club}
          content={post.content}
          creator={post.creator.username}
          points={post.points}
          title={post.title}
          key={post.id}
          hasVoted={post.hasVoted}
        />
      ))}
      <Flex justifyContent={"center"}>
        {data.latestPosts.hasMore && (
          <SecondaryButton
            variant="outline"
            onClick={() => {
              fetchMore({
                variables: {
                  limit: 10,
                  cursor:
                    data.latestPosts.posts[data.latestPosts.posts.length - 1]
                      .createdAt,
                },
              });
            }}
          >
            Load More
          </SecondaryButton>
        )}
      </Flex>
    </>
  );
};
