import { FieldError } from "../auth/auth.types";
import { Post } from "./post.entity";
import { PostUpvote } from "../post-upvote/post-upvote.entity";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class UpvoteResponse {
  @Field(() => PostUpvote, { nullable: true })
  upvote?: PostUpvote;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field(() => Boolean)
  hasMore: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
