import { FieldError } from "@/generated/graphql";

export const formatErrorMessage = (errors: FieldError[]) => {
  const formError: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    formError[field] = message;
  });

  return formError;
};
