import { Field, ObjectType, Int } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Comment } from "../comment/comment.entity";

@ObjectType()
@Entity()
export class CommentUpvote extends BaseEntity {
  @Field(() => Int)
  @Column()
  value: number;

  @Field(() => Comment)
  @ManyToOne(() => Comment, (comment) => comment.commentUpvotes, {
    onDelete: "CASCADE",
  })
  comment: Comment;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "CASCADE", nullable: true })
  creator: User;

  @Field(() => Int)
  @PrimaryColumn()
  commentId: number;
  @Field(() => Int)
  @PrimaryColumn()
  creatorId: number;
}
