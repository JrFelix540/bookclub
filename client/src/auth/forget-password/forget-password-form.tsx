import { useFormik } from "formik";
import { Form } from "../components/form/form";
import { Input } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { useMutation } from "@apollo/client";
import { ForgetPasswordDocument } from "@/generated/graphql";
import { forgetPasswordSchema } from "./forget-password.utils";
export const ForgetPasswordForm: React.FC = () => {
  const [forgetPassword, { loading }] = useMutation(ForgetPasswordDocument);
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
    <Form onSubmit={formik.handleSubmit}>
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
    </Form>
  );
};
