import { object, string } from "yup";

export const createPostSchema = object({
  title: string()
    .ensure()
    .required("Title is required")
    .test("Is Empty", "Cannot be only empty characters", (value) => {
      return value.split(" ").join("").length !== 0;
    }),
  content: string()
    .ensure()
    .required("Content is required")
    .test("Is Empty", "Cannot be only empty characters", (value) => {
      return value.split(" ").join("").length !== 0;
    })
    .required("Content is required"),
  clubId: string().required("Select a community"),
});
