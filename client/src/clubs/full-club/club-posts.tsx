import { PostPreview } from "@/components/post-preview/post-preview";
import { CommunityPostsDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { EmptyPosts } from "./empty-posts";
import { PostsLoading } from "@/components/posts-loading/posts-loading";
interface ClubPostsProps {
  club: {
    id: number;
    name: string;
  };
}
export const ClubPosts: React.FC<ClubPostsProps> = ({ club }) => {
  const { data, loading } = useQuery(CommunityPostsDocument, {
    variables: {
      limit: 10,
      communityId: club.id,
    },
  });

  if (loading) {
    return <PostsLoading />;
  }
  return (
    <Container>
      {data?.communityPosts?.posts?.length === 0 && <EmptyPosts />}
      {data?.communityPosts?.posts?.map((post) => (
        <PostPreview
          key={post.id}
          id={post.id}
          club={club}
          content={post.content}
          creator={post.creator.username}
          points={post.points}
          title={post.title}
          hasVoted={post.hasVoted}
        />
      ))}
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
