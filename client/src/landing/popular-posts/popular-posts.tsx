import { PostPreview } from "@/components/post-preview/post-preview";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
import { PopularPostsDocument } from "@/generated/graphql";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";

export const PopularPosts = () => {
  const { data, error, loading } = useQuery(PopularPostsDocument, {
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
    </>
  );
};
