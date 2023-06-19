import { ObjectType, Field, Int } from "type-graphql";
import { CommentUpvote } from "../comment-upvote/comment-upvote.entity";
import { Post } from "../post/post.entity";
import { User } from "../user/user.entity";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  content!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  creator!: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: true,
    onDelete: "CASCADE",
  })
  post: Post;

  @Field(() => [Int])
  @Column("int", { array: true, nullable: true })
  commentIds: number[];

  @Field()
  @Column({ default: 0 })
  points!: number;

  @Field(() => Int)
  @Column({ nullable: true })
  parentCommentId: number;

  @Field(() => CommentUpvote)
  @OneToMany(() => CommentUpvote, (commentUpvote) => commentUpvote.comment, {
    onDelete: "CASCADE",
  })
  commentUpvotes: CommentUpvote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
