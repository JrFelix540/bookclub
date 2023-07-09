import { PostPreview } from "@/components/post-preview/post-preview";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { PopularPostsDocument } from "@/generated/graphql";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";

export const PopularPosts = () => {
  const { data, error, loading, fetchMore } = useQuery(PopularPostsDocument, {
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
      {data.popularPosts?.posts?.map((post) => (
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
      {data.popularPosts?.hasMore && (
        <Flex justifyContent="center">
          <SecondaryButton
            variant="outline"
            onClick={() =>
              fetchMore({
                variables: {
                  offset: data.popularPosts?.posts.length,
                  limit: 10,
                },
              })
            }
          >
            Load More
          </SecondaryButton>
        </Flex>
      )}
    </>
  );
};
