import { object, string } from "yup";

export const createPostSchema = object({
  title: string().required("Title is required"),
  content: string().required("Content is required"),
  communityId: string().required("Select a community"),
});
