import { PostPreview } from "@/components/post-preview/post-preview";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
import { PostsDocument } from "@/generated/graphql";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";

export const PopularPosts = () => {
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
