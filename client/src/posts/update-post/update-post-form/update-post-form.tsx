import { Textarea, Input } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { PostQuery, UpdatePostDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { updatePostSchema } from "./update-post-form.utils";

interface UpdatePostFormProps {
  post: PostQuery["post"];
}
export const UpdatePostForm: React.FC<UpdatePostFormProps> = ({ post }) => {
  const [updateForm, { loading }] = useMutation(UpdatePostDocument);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: post.title,
      content: post.content,
    },
    validationSchema: updatePostSchema,
    onSubmit: async (values) => {
      const { data } = await updateForm({
        variables: {
          updatePostId: post.id,
          ...values,
        },
      });

      if (data) {
        router.push(`/posts/${data.updatePost.post?.id}`);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        id="title"
        name="title"
        type="text"
        label="Title"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
        touched={formik.touched.title}
        onBlur={formik.handleBlur}
      />
      <Textarea
        id="content"
        name="content"
        label="Content"
        onChange={formik.handleChange}
        value={formik.values.content}
        error={formik.errors.content}
        touched={formik.touched.content}
        onBlur={formik.handleBlur}
      />
      <Flex justifyContent={"flex-end"}>
        <PrimaryButton type="submit" isLoading={loading}>
          Update Post
        </PrimaryButton>
      </Flex>
    </Form>
  );
};

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
});
