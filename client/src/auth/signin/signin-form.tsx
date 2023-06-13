import { Input } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { MeDocument, MeQuery, SignInDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { formatErrorMessage } from "../utils/formatErrors";
import { useRouter } from "next/router";
import { signInSchema } from "./signin-utils";

export const SignInForm = () => {
  const router = useRouter();
  const [signIn, { loading }] = useMutation(SignInDocument);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values, { setErrors }) => {
      const { data } = await signIn({
        variables: values,
        update(cache, { data }) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: {
                id: data?.signin.loggedInUser?.id,
                username: data?.signin.loggedInUser?.username,
              },
            },
          });
        },
      });
      if (data?.signin.errors) {
        setErrors(formatErrorMessage(data?.signin.errors));
      }
      if (data?.signin?.loggedInUser) {
        localStorage.setItem("token", data?.signin.loggedInUser.accessToken);
        router.push("/");
      }
    },
    validationSchema: signInSchema,
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
        onBlur={formik.handleBlur}
      />
      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
        onBlur={formik.handleBlur}
      />
      <PrimaryButton type="submit" isLoading={loading}>
        Sign In
      </PrimaryButton>
    </StyledForm>
  );
};

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "320px",
});
