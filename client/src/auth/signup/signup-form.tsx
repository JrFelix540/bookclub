import { Input } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { SignupDocument, MeDocument, MeQuery } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { formatErrorMessage } from "../utils/formatErrors";
import { useRouter } from "next/router";
import { signUpSchema } from "./signup-utils";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [signup, { loading }] = useMutation(SignupDocument);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    onSubmit: async (values, { setErrors }) => {
      const { data } = await signup({
        variables: values,
        update(cache, { data }) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: {
                id: data?.signup.loggedInUser?.id,
                username: data?.signup.loggedInUser?.username,
              },
            },
          });
        },
      });
      if (data?.signup.errors) {
        setErrors(formatErrorMessage(data?.signup.errors));
      }
      if (data?.signup.loggedInUser) {
        localStorage.setItem("token", data.signup.loggedInUser.accessToken);
        router.push("/");
      }
    },
    validationSchema: signUpSchema,
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
        id="username"
        name="username"
        type="text"
        label="Username"
        onChange={formik.handleChange}
        value={formik.values.username}
        error={formik.errors.username}
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
        Sign Up
      </PrimaryButton>
      <Text fontSize="xs">
        Already have an account?
        <StyledLink href="/auth/sign-in">&nbsp;Sign In</StyledLink>
      </Text>
    </StyledForm>
  );
};

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "320px",
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary,
}));
