import { Input, Textarea } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { createClubSchema } from "./create-club-util";
import { useMutation } from "@apollo/client";
import { CreateClubDocument, MyClubsDocument } from "@/generated/graphql";
import { formatErrorMessage } from "@/auth/utils/formatErrors";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

export const CreateClubForm = () => {
  const router = useRouter();
  const [createClub, { loading }] = useMutation(CreateClubDocument, {
    refetchQueries: [MyClubsDocument],
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values, { setErrors }) => {
      const { data } = await createClub({ variables: values });
      if (data?.createClub.errors) {
        setErrors(formatErrorMessage(data?.createClub.errors));
      }
      router.push(`/clubs/${data?.createClub.club?.id}`);
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
        touched={formik.touched.name}
        onBlur={formik.handleBlur}
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
        touched={formik.touched.description}
        onBlur={formik.handleBlur}
      />
      <Flex justifyContent="flex-end">
        <PrimaryButton type="submit" isLoading={loading}>
          Create BookClub
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
