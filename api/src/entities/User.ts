import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Review, Post, Upvote, UserComment } from "./";
import { Community } from "../community/community.entity";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Community])
  @OneToMany(() => Community, (community) => community.creator, {
    onDelete: "SET NULL",
  })
  createdCommunities: Community[];

  @Field(() => [Community])
  @ManyToMany(() => Community, (community) => community.members, {
    onDelete: "SET NULL",
  })
  memberCommunities: Community[];

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.creator, {
    onDelete: "CASCADE",
  })
  reviews: Review[];

  @Field(() => [Upvote])
  @OneToMany(() => Upvote, (upvote) => upvote.creator, {
    onDelete: "CASCADE",
  })
  upvotes: Upvote[];

  @Field(() => [UserComment])
  @OneToMany(() => UserComment, (userComment) => userComment.creator, {
    onDelete: "CASCADE",
  })
  comments: UserComment[];

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.creator, {
    onDelete: "CASCADE",
  })
  posts: Post[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
