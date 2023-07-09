import { object, string } from "yup";

export const editEventSchema = object({
  title: string()
    .required("An event title is needed")
    .ensure()
    .test("Is Empty", "Cannot be only empty characters", (value) => {
      return value.split(" ").join("").length !== 0;
    }),
  description: string()
    .required("An event description is needed")
    .min(10, "A longer description is needed")
    .test("Is Empty", "Cannot be only empty characters", (value) => {
      return value.split(" ").join("").length !== 0;
    }),
  date: string().required("A date is required"),
  duration: string().required("An event duration is needed"),
  meetingLink: string(),
});
