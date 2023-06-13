interface Configuration {
  DATABASE_URL: string;
  JWT_SECRET: string;
  PORT: string;
  MODE: string;
  REDIS_URL: string;
  NODEMAILER_USER: string;
  NODEMAILER_PASSWORD: string;
  FRONTEND_URL: string;
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
    NODEMAILER_USER: process.env.NODE_MAILER_USER || "",
    NODEMAILER_PASSWORD: process.env.NODE_MAILER_PASSWORD || "",
    FRONTEND_URL: process.env.FRONTEND_URL || "",
  };

  globalConfig = newConfig;

  return globalConfig;
};
