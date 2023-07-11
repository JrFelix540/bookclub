import { useFormik } from "formik";
import { Form } from "../components/form/form";
import { Input } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { useMutation } from "@apollo/client";
import { ForgetPasswordDocument } from "@/generated/graphql";
import { forgetPasswordSchema } from "./forget-password.utils";
import styled from "@emotion/styled";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
export const ForgetPasswordForm: React.FC = () => {
  const [forgetPassword, { data, loading }] = useMutation(
    ForgetPasswordDocument
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      await forgetPassword({ variables: values });
    },
    validationSchema: forgetPasswordSchema,
  });
  return (
    <Flex direction="column" gap="5px">
      <Form onSubmit={formik.handleSubmit}>
        {data && (
          <TextContainer>
            If you have provided a valid email address, a password reset link
            has been sent.
          </TextContainer>
        )}
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
        <PrimaryButton type="submit" isLoading={loading}>
          Send Reset Link
        </PrimaryButton>
        <Text fontSize="xs">
          Return to
          <StyledLink href="/auth/sign-in">&nbsp;Sign In</StyledLink>
        </Text>
      </Form>
    </Flex>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary,
}));

const TextContainer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "10px",
  color: theme.palette.text.secondary,
  backgroundColor: "#335248",
}));
