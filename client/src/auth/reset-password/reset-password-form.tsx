import { useFormik } from "formik";
import { Form } from "../components/form/form";
import { Input } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { useRouter } from "next/router";
import { ResetPasswordDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { resetPasswordSchema } from "./reset-password.utils";

export const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const token = (router.query.token as string) || "";
  const [resetPassword, { loading }] = useMutation(ResetPasswordDocument);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      const { data } = await resetPassword({
        variables: { token, password: values.password },
      });
      if (data?.resetPassword) {
        router.push("/auth/sign-in");
      }
    },
    validationSchema: resetPasswordSchema,
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        id="passwod"
        name="password"
        type="password"
        label="New Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
        onBlur={formik.handleBlur}
      />
      <PrimaryButton type="submit" isLoading={loading}>
        Reset Password
      </PrimaryButton>
    </Form>
  );
};
