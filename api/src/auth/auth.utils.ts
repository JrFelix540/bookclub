import { UserRegisterInput } from "src/resolvers/user";
import { signUpSchema } from "./auth.schema";
import { FieldError } from "./auth.types";

export const ACCESS_TOKEN_HEADER_NAME = "Authorization";

export const validateUserRegisterInput = async (
  input: UserRegisterInput
): Promise<FieldError[]> => {
  try {
    signUpSchema.validateSync(input, { abortEarly: false });
    return [];
  } catch (error) {
    const errors: FieldError[] = error.inner.map((err: any) => ({
      field: err.path,
      message: err.message,
    }));
    return errors;
  }
};
