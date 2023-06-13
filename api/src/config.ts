import dotenv from "dotenv";
dotenv.config();
export default {
  databaseUrl: process.env.DATABASE_URL,
  corsOriginUrl: process.env.CORS_ORIGIN_URL,
  nodemailerEmail: process.env.NODE_MAILER_USER,
  nodemailerPassword: process.env.NODE_MAILER_PASSWORD,
  redisUrl: process.env.REDIS_URL,
  redisPassword: process.env.REDIS_PASSWORD,
  port: process.env.PORT,
  development: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
};
