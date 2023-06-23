import { PostsDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
import { PostPreview } from "@/components/post-preview/post-preview";
import { ErrorPage } from "@/layouts/error";

export const LatestPosts = () => {
  const { data, error, loading } = useQuery(PostsDocument, {
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
      {data?.posts?.posts?.map((post) => (
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
    </>
  );
};
