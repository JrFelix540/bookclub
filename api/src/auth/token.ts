import jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../config/env";
import { GraphQLError } from "graphql";

const ACCESS_TOKEN_DURATION = "1d";
const RESET_TOKEN_DURATION = "1h";

const env = getEnvironmentVariables();

export enum TokenType {
  Auth = "auth",
  Reset = "reset",
  EmailConfirmation = "email_confirmation",
}

export interface JwtToken {
  userId: number;
  type: TokenType;
}

export const generateAuthToken = (tokenBody: { userId: number }): string => {
  try {
    const payload = { ...tokenBody, type: TokenType.Auth };
    const authToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_DURATION,
    });
    return authToken;
  } catch (e) {
    console.log("failed to generate tokens for", tokenBody.userId);
    throw new Error(e);
  }
};

export const generateResetToken = (tokenBody: { userId: number }) => {
  try {
    const payload = { ...tokenBody, type: TokenType.Reset };
    const resetToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: RESET_TOKEN_DURATION,
    });
    return resetToken;
  } catch (e) {
    console.log("failed to generate token for", tokenBody.userId);
    throw new Error(e);
  }
};

export const verifyToken = (token: string): JwtToken => {
  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtToken;
    return decodedToken;
  } catch (e) {
    console.log("failed to verify token");
    throw new GraphQLError(e);
  }
};

export const getUserIdFromToken = (
  token: string,
  type: TokenType
): number | null => {
  if (!token) {
    throw new Error("Empty token");
  }
  if (token.split(" ")[1]) {
    return null;
  }
  const decodedToken = verifyToken(token.split(" ")[1]);
  if (!decodedToken) {
    throw new Error("Couldn't find token");
  }
  if (decodedToken.type !== type) {
    throw new Error("Wrong token type");
  }
  return decodedToken.userId;
};
