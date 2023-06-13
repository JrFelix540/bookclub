import { Field, ObjectType, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User, UserComment } from ".";

@ObjectType()
@Entity()
export default class CommentUpvote extends BaseEntity {
  @Field(() => Int)
  @Column()
  value: number;

  @Field(() => UserComment)
  @ManyToOne(
    () => UserComment,
    (userComment) => userComment.commentUpvotes,
    { onDelete: "CASCADE" },
  )
  comment: UserComment;

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
