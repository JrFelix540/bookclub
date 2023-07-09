import { UpdateClubEventMutation } from "@/generated/graphql";
import { ApolloCache, gql } from "@apollo/client";
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
  meetingLink: string().required("A meeting link is required"),
});

export const updateEventCache = (
  event: UpdateClubEventMutation["updateClubEvent"],
  cache: ApolloCache<UpdateClubEventMutation>
) => {
  const data = cache.readFragment({
    id: "ClubEvent:" + event.id,
    fragment: gql`
      fragment _ on ClubEvent {
        id
        title
        description
        duration
        date
        meetingLink
      }
    `,
  });

  if (data) {
    cache.writeFragment({
      id: "ClubEvent:" + event.id,
      fragment: gql`
        fragment _ on ClubEvent {
          title
          description
          duration
          date
          meetingLink
        }
      `,
      data: {
        title: event.title,
        description: event.description,
        duration: event.duration,
        date: event.date,
        meetingLink: event.meetingLink,
      },
    });
  }
};
