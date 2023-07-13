import "reflect-metadata";
import { DataSource } from "typeorm";
import { getEnvironmentVariables } from "../config/env";
import path from "path";
import { Club } from "../club/club.entity";
import { User } from "../user/user.entity";
import { Comment } from "../comment/comment.entity";
import { Post } from "../post/post.entity";
import { PostUpvote } from "../post-upvote/post-upvote.entity";
import { CommentUpvote } from "../comment-upvote/comment-upvote.entity";
import { ClubEvent } from "../club-event/club-events.entity";

const env = getEnvironmentVariables();
export const appDataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,
  logging: true,
  synchronize: true,
  ssl: process.env.NODE_ENV === "production",
  entities: [Club, PostUpvote, Comment, User, Post, CommentUpvote, ClubEvent],
  migrations: [path.join(__dirname, "./migration/*")],
  migrationsTableName: "bookclub_migration_table",
});

export const userRepository = appDataSource.getRepository(User);
export const clubRepository = appDataSource.getRepository(Club);
export const postRepository = appDataSource.getRepository(Post);
export const commentRepository = appDataSource.getRepository(Comment);
export const commentUpvoteRepository =
  appDataSource.getRepository(CommentUpvote);
export const postUpvoteRepository = appDataSource.getRepository(PostUpvote);
export const clubEventRepository = appDataSource.getRepository(ClubEvent);
