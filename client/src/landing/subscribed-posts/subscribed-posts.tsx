import { PostPreview } from "@/components/post-preview/post-preview";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { FeedPostsDocument, MeDocument } from "@/generated/graphql";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { LandingEmptyPosts } from "../empty-posts/empty-posts";

export const SubscribedPosts = () => {
  const { data: meData } = useQuery(MeDocument);

  const { data, loading, error, fetchMore } = useQuery(FeedPostsDocument, {
    variables: { limit: 10 },
  });

  if (error) {
    return <ErrorPage />;
  }

  if (loading) {
    return <PostsLoading />;
  }

  if (data?.myClubsPosts?.posts.length === 0) {
    return (
      <LandingEmptyPosts>
        {meData?.me
          ? "Join some clubs to get posts here"
          : "Kindly login to get a custom home feed"}
      </LandingEmptyPosts>
    );
  }

  return (
    <>
      {data?.myClubsPosts?.posts?.map((post) => (
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
      {data?.myClubsPosts?.hasMore && (
        <Flex justifyContent="center">
          <SecondaryButton
            variant="outline"
            onClick={() => {
              fetchMore({
                variables: {
                  cursor:
                    data.myClubsPosts?.posts[data.myClubsPosts.posts.length - 1]
                      .createdAt,
                  limit: 10,
                },
              });
            }}
          >
            Load More
          </SecondaryButton>
        </Flex>
      )}
    </>
  );
};
