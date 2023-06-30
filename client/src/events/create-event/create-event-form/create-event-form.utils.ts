import { object, string } from "yup";

export const createEventSchema = object({
  clubId: string().required(),
  title: string().required("An event title is needed"),
  description: string()
    .required("An event description is needed")
    .min(10, "A longer description is needed"),
  date: string().required("A date is required"),
  duration: string().required("An event duration is needed"),
  meetingLink: string(),
});
