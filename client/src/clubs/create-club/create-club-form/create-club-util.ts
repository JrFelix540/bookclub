import { object, string } from "yup";

export const createClubSchema = object({
  name: string().required("A name is required").min(4, "Longer name please"),
  description: string()
    .required("A description is required")
    .min(10, "Longer description please"),
});
