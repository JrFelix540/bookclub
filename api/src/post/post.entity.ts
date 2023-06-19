import { Field, Int, ObjectType } from "type-graphql";
import { User } from "../user/user.entity";
import { PostUpvote } from "../post-upvote/post-upvote.entity";
import { Comment } from "../comment/comment.entity";
import { Community } from "../community/community.entity";

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  content!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  creator!: User;

  @Field(() => Int)
  @Column()
  creatorId!: number;

  @Field(() => Community)
  @ManyToOne(() => Community, (community) => community.posts, {
    onDelete: "SET NULL",
  })
  community!: Community;

  @Field(() => Int)
  @Column({ nullable: true })
  communityId: number;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post, {
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @Field(() => [PostUpvote], { nullable: true })
  @OneToMany(() => PostUpvote, (postUpvote) => postUpvote.post, {
    onDelete: "CASCADE",
  })
  postUpvotes: PostUpvote[];

  @Field(() => Int)
  @Column({ default: 0 })
  points: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
