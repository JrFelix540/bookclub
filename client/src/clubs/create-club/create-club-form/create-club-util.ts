import { object, string } from "yup";

export const createClubSchema = object({
  name: string()
    .ensure()
    .test("Is Empty", "Cannot be only empty characters", (value) => {
      return value.split(" ").join("").length !== 0;
    })
    .required("A name is required")
    .min(4, "Longer name please"),
  description: string()
    .ensure()
    .required("A description is required")
    .min(10, "Longer description please")
    .test("Is Empty", "Cannot be only empty characters", (value) => {
      return value.split(" ").join("").length !== 0;
    }),
});
