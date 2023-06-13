import { Field, Int, ObjectType } from "type-graphql";
import { Upvote, User, UserComment } from "./";
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
export default class Post extends BaseEntity {
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

  @Field(() => [UserComment])
  @OneToMany(() => UserComment, (userComment) => userComment.post, {
    onDelete: "CASCADE",
  })
  comments: UserComment[];

  @Field(() => [Upvote], { nullable: true })
  @OneToMany(() => Upvote, (upvote) => upvote.post, {
    onDelete: "CASCADE",
  })
  upvotes: Upvote[];

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
