import { object, string } from "yup";

export const resetPasswordSchema = object({
  password: string()
    .min(6, "Password should be atleast 6 characters long")
    .required("Password is required"),
});
