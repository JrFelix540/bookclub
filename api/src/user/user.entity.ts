import { Post } from "../post/post.entity";
import { Comment } from "../comment/comment.entity";
import { PostUpvote } from "../post-upvote/post-upvote.entity";
import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Club } from "../club/club.entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
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

  @Field(() => [Club])
  @OneToMany(() => Club, (club) => club.creator, {
    onDelete: "SET NULL",
  })
  createdClubs: Club[];

  @Field(() => [Club])
  @ManyToMany(() => Club, (club) => club.members, {
    onDelete: "SET NULL",
  })
  memberClubs: Club[];

  @Field(() => [PostUpvote])
  @OneToMany(() => PostUpvote, (postUpvote) => postUpvote.creator, {
    onDelete: "CASCADE",
  })
  upvotes: PostUpvote[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.creator, {
    onDelete: "CASCADE",
  })
  comments: Comment[];

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
