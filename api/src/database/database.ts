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

const env = getEnvironmentVariables();
export const AppDataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,
  logging: true,
  synchronize: true,
  entities: [Club, PostUpvote, Comment, User, Post, CommentUpvote],
  migrations: [path.join(__dirname, "./migration/*")],
  migrationsTableName: "bookclub_migration_table",
});

export const userRepository = AppDataSource.getRepository(User);
export const clubRepository = AppDataSource.getRepository(Club);
export const postRepository = AppDataSource.getRepository(Post);
export const commentRepository = AppDataSource.getRepository(Comment);
export const commentUpvoteRepository =
  AppDataSource.getRepository(CommentUpvote);
export const postUpvoteRepository = AppDataSource.getRepository(PostUpvote);
