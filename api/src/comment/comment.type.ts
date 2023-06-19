import { FieldError } from "../auth/auth.types";
import { Comment } from "./comment.entity";
import { CommentUpvote } from "../comment-upvote/comment-upvote.entity";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserCommentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Comment, { nullable: true })
  comment?: Comment;
}

@ObjectType()
export class CommentUpvoteResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CommentUpvote, { nullable: true })
  commentUpvote?: CommentUpvote;
}
