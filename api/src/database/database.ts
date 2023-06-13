import "reflect-metadata";
import { DataSource } from "typeorm";
import { getEnvironmentVariables } from "../config/env";
import path from "path";
import {
  Author,
  Book,
  Genre,
  Review,
  Shelf,
  Upvote,
  UserComment,
  User,
  Post,
  CommentUpvote,
} from "../entities";
import { Community } from "../community/community.entity";

const env = getEnvironmentVariables();
export const AppDataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,
  logging: true,
  synchronize: true,
  entities: [
    Author,
    Book,
    Community,
    Genre,
    Review,
    Shelf,
    Upvote,
    UserComment,
    User,
    Post,
    CommentUpvote,
  ],
  migrations: [path.join(__dirname, "./migration/*")],
  migrationsTableName: "bookclub_migration_table",
});

export const userRepository = AppDataSource.getRepository(User);
export const communityRepository = AppDataSource.getRepository(Community);
export const postRepository = AppDataSource.getRepository(Post);
export const upvoteRepository = AppDataSource.getRepository(Upvote);
export const userCommentRepository = AppDataSource.getRepository(UserComment);
export const commentUpvoteRepository =
  AppDataSource.getRepository(CommentUpvote);
export const postUpvoteRepository = AppDataSource.getRepository(Upvote);
