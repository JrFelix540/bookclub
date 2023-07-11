interface Configuration {
  DATABASE_URL: string;
  JWT_SECRET: string;
  PORT: string;
  MODE: string;
  REDIS_URL: string;
  NODEMAILER_USER: string;
  NODEMAILER_PASSWORD: string;
  NODEMAILER_PORT: string;
  NODEMAILER_HOST: string;
  FRONTEND_URL: string;
  SENDGRID_API_KEY: string;
  SENDGRID_SENDER_EMAIL: string;
  REDIRECT_DOMAIN: string;
}

let globalConfig: Configuration;

export const getEnvironmentVariables = (): Configuration => {
  if (globalConfig) {
    return globalConfig;
  }

  const newConfig: Configuration = {
    DATABASE_URL:
      process.env.DATABASE_URL ||
      "postgres://postgres:postgres@127.0.0.1:5432/bookclub",
    JWT_SECRET: process.env.JWT_SECRET || "qid",
    PORT: process.env.PORT || "4000",
    MODE: process.env.MODE || "development",
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
    NODEMAILER_USER: process.env.NODEMAILER_USER || "",
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD || "",
    FRONTEND_URL: process.env.FRONTEND_URL || "",
    NODEMAILER_PORT: process.env.NODEMAILER_PORT || "",
    NODEMAILER_HOST: process.env.NODEMAILER_HOST || "",
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
    SENDGRID_SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL || "",
    REDIRECT_DOMAIN: process.env.REDIRECT_DOMAIN || "",
  };

  globalConfig = newConfig;

  return globalConfig;
};
