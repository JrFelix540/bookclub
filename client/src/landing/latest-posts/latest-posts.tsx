import { PostPreview } from "@/components/post-preview/post-preview";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { LatestPostsDocument } from "@/generated/graphql";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";

export const LatestPosts = () => {
  const { data, error, loading, fetchMore } = useQuery(LatestPostsDocument, {
    variables: { limit: 10 },
  });
  if (error) {
    return <ErrorPage />;
  }

  if (!data) {
    return loading ? <PostsLoading /> : <p>Wait a minute</p>;
  }
  return (
    <>
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
