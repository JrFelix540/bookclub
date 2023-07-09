import { UpdatePostMutation } from "@/generated/graphql";
import { ApolloCache, gql } from "@apollo/client";
import { object, string } from "yup";

export const updatePostSchema = object({
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
});

export const updateCache = (
  title: string,
  content: string,
  cache: ApolloCache<UpdatePostMutation>,
  postId: number
) => {
  const data = cache.readFragment<{
    id: number;
    title: string;
    content: string;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        title
        content
      }
    `,
  });

  if (data) {
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment _ on Post {
          title
          content
        }
      `,
      data: { title, content },
    });
  }
};
