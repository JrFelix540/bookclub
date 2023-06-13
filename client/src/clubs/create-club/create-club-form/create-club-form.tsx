import { Input, Textarea } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { createClubSchema } from "./create-club-util";
import { useMutation } from "@apollo/client";
import { CreateCommunityDocument } from "@/generated/graphql";
import { formatErrorMessage } from "@/auth/utils/formatErrors";
import { useRouter } from "next/router";

export const CreateClubForm = () => {
  const router = useRouter();
  const [createClub, { loading }] = useMutation(CreateCommunityDocument);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const { data } = await createClub({ variables: values });
      if (data?.createCommunity.errors) {
        setErrors(formatErrorMessage(data?.createCommunity.errors));
      }
      router.push(`/clubs/${data?.createCommunity.community?.id}`);
    },
    validationSchema: createClubSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        id="name"
        name="name"
        type="text"
        label="Title"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.errors.name}
        onBlur={formik.handleBlur}
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
        onBlur={formik.handleBlur}
      />
      <PrimaryButton type="submit" isLoading={loading}>
        Create BookClub
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
