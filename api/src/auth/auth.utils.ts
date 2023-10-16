import { signUpSchema } from "./auth.schema";
import { FieldError, SignUpPayload } from "./auth.types";
import type { MyContext } from "../types";
import { AuthChecker } from "type-graphql";
import { TokenType, getUserIdFromToken } from "./token";
import { ValidationError } from "yup";

export const ACCESS_TOKEN_HEADER_NAME = "Authorization";

export const validateUserRegisterInput = async (
  input: SignUpPayload
): Promise<FieldError[]> => {
  try {
    signUpSchema.validateSync(input, { abortEarly: false });
    return [];
  } catch (error) {
    const errors: FieldError[] = (error as ValidationError).inner.map(
      (err: any) => ({
        field: err.path,
        message: err.message,
      })
    );
    return errors;
  }
};

export const authChecker: AuthChecker<MyContext> = ({ context }) => {
  if (!context.token) {
    return false;
  }

  const token = context.token.split(" ")[1];
  const userId = getUserIdFromToken(token, TokenType.Auth);
  if (!userId) {
    return false;
  }
  context.res.locals.userId = userId;
  return true;
};
