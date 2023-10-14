import { Field, Int, ObjectType } from "type-graphql";
import type { Relation } from "typeorm";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";

import { BaseEntity, Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class PostUpvote extends BaseEntity {
  @Field(() => Int)
  @Column()
  value: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.postUpvotes, {
    onDelete: "CASCADE",
  })
  post: Relation<Post>;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.upvotes, {
    onDelete: "CASCADE",
  })
  creator: Relation<User>;

  @Field(() => Int)
  @PrimaryColumn()
  creatorId: number;

  @Field(() => Int)
  @PrimaryColumn()
  postId: number;
}
