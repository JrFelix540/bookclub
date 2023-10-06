import { formatErrorMessage } from "@/auth/utils/formatErrors";
import { Input, Textarea } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { SelectInput } from "@/components/select-input/select-input";
import { CreatePostDocument, MyClubsDocument } from "@/generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { createPostSchema } from "./create-post-form.utils";
import { Alert, AlertDescription, AlertIcon, Flex } from "@chakra-ui/react";

export const CreatePostForm = () => {
  const router = useRouter();
  const [createPost, { loading }] = useMutation(CreatePostDocument);

  const { data } = useQuery(MyClubsDocument);

  const defaultClubId = data?.meWithClubs?.memberClubs[0]?.id.toString();

  const formik = useFormik({
    initialValues: {
      clubId: defaultClubId || "",
      title: "",
      content: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const { data: postData } = await createPost({
        variables: {
          ...values,
          clubId: parseInt(values.clubId),
        },
        refetchQueries: [],
      });
      if (postData?.createPost.errors) {
        setErrors(formatErrorMessage(postData?.createPost.errors));
      }
      if (postData) {
        router.push(`/posts/${postData?.createPost.post?.id}`);
      }
    },
    validationSchema: createPostSchema,
    enableReinitialize: true,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {!defaultClubId && (
        <Alert>
          <AlertIcon />
          <AlertDescription>
            Oops! You need to join or create a bookclub to make a post!
          </AlertDescription>
        </Alert>
      )}
      <SelectInput
        id="clubId"
        name="clubId"
        placeholder="Select bookclub"
        error={formik.errors.clubId}
        label="Select community"
        touched={formik.touched.clubId}
        value={formik.values.clubId}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      >
        {data?.meWithClubs?.memberClubs.map((club) => (
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
          Create Post
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
