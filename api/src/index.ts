import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./auth/auth.resolver";
import { ClubResolver } from "./club/club.resolver";
import { PostResolver } from "./post/post.resolver";
import { CommentResolver } from "./comment/comment.resolver";
import { ClubEventsResolver } from "./club-event/club-events.resolver";
import { getEnvironmentVariables } from "./config/env";
import { appDataSource } from "./database/database";
import { UserResolver } from "./user/user.resolver";
import { MyContext } from "./types";
import { authChecker } from "./auth/auth.utils";

const env = getEnvironmentVariables();

const main = async () => {
  await appDataSource.initialize();

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        ClubResolver,
        PostResolver,
        CommentResolver,
        AuthResolver,
        ClubEventsResolver,
      ],
      authChecker: authChecker,
      authMode: "null",
    }),
  });

  await server.start();

  app.use(
    "/",

    cors<cors.CorsRequest>({
      origin: env.FRONTEND_URL,
      credentials: true,
    }),

    bodyParser.json(),

    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return {
          res,
          token: req.headers.authorization || "",
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000/`);
};

main().catch((err) => console.log(err));
