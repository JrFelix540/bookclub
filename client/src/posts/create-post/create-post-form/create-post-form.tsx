import { Input, Textarea } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import {
  ClubsDocument,
  CreatePostDocument,
  MyCommunitiesDocument,
} from "@/generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { createPostSchema } from "./create-post-form.utils";
import { SelectInput } from "@/components/select-input/select-input";
import { formatErrorMessage } from "@/auth/utils/formatErrors";
import { useRouter } from "next/router";

export const CreatePostForm = () => {
  const router = useRouter();
  const [createPost, { loading }] = useMutation(CreatePostDocument);

  const { data } = useQuery(MyCommunitiesDocument);

  const defaultClubId =
    data?.meWithCommunities?.memberCommunities[0].id.toString();

  const formik = useFormik({
    initialValues: {
      communityId: defaultClubId || "",
      title: "",
      content: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const { data: postData } = await createPost({
        variables: {
          ...values,
          communityId: parseInt(values.communityId),
        },
        refetchQueries: [ClubsDocument],
      });
      if (postData?.createPost.errors) {
        setErrors(formatErrorMessage(postData?.createPost.errors));
      }
      router.push(`/posts/${postData?.createPost.post?.id}`);
    },
    validationSchema: createPostSchema,
    enableReinitialize: true,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <SelectInput
        id="communityId"
        name="communityId"
        value={formik.values.communityId}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      >
        {data?.meWithCommunities?.memberCommunities.map((club) => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </SelectInput>
      <Input
        id="title"
        name="title"
        type="text"
        label="Title"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
        onBlur={formik.handleBlur}
      />
      <Textarea
        id="content"
        name="content"
        label="Content"
        onChange={formik.handleChange}
        value={formik.values.content}
        error={formik.errors.content}
        onBlur={formik.handleBlur}
      />
      <PrimaryButton type="submit" isLoading={loading}>
        Create Post
      </PrimaryButton>
    </Form>
  );
};

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
});
