import jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../config/env";

const ACCESS_TOKEN_DURATION = "1d";
const RESET_TOKEN_DURATION = "1h";
const CONFIRM_EMAIL_DURATION = "1h";

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

export const verifyToken = (token: string): JwtToken | null => {
  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtToken;
    return decodedToken;
  } catch (e) {
    console.log("failed to verify token", e);
    return null;
  }
};

export const generateConfirmEmailToken = (tokenBody: { userId: number }) => {
  try {
    const payload = { ...tokenBody, type: TokenType.EmailConfirmation };
    const confirmEmailToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: CONFIRM_EMAIL_DURATION,
    });
    return confirmEmailToken;
  } catch (e) {
    console.log(
      "failed to generate email confirmation token for",
      tokenBody.userId
    );
    throw new Error(e);
  }
};

export const getUserIdFromToken = (
  token: string,
  type: TokenType
): number | null => {
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return null;
  }
  if (decodedToken.type !== type) {
    console.log("Wrong token type");
    return null;
  }
  return decodedToken.userId;
};
