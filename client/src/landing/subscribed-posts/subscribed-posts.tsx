import { FeedPostsDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { PostPreview } from "@/components/post-preview/post-preview";
import { EmptyPosts } from "@/components/empty-posts/empty-posts";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
import { ErrorPage } from "@/layouts/error";

export const SubscribedPosts = () => {
  const { data, loading, error } = useQuery(FeedPostsDocument, {
    variables: { limit: 10 },
  });
  if (error) {
    return <ErrorPage />;
  }

  if (!data?.myClubsPosts) {
    return loading ? (
      <PostsLoading />
    ) : (
      <EmptyPosts>
        <p>Join some clubs to get posts here </p>
      </EmptyPosts>
    );
  }

  return (
    <>
      {data.myClubsPosts.posts?.map((post) => (
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
    </>
  );
};
