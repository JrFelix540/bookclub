import { object, string } from "yup";
export const forgetPasswordSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
});
