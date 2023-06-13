import { object, string } from "yup";

export const signUpSchema = object({
  username: string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username is required"),
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const signInSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});
