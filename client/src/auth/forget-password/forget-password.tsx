import { PageHead } from "@/components/page-head/page-head";
import { AuthLayout } from "../components/auth-layout/auth-layout";
import { Heading } from "@chakra-ui/react";
import { ForgetPasswordForm } from "./forget-password-form";

export const ForgetPassword: React.FC = () => {
  return (
    <>
      <PageHead title="Reset Password" />
      <AuthLayout>
        <Heading fontSize="2xl">Forgot Your Password?</Heading>
        <ForgetPasswordForm />
      </AuthLayout>
    </>
  );
};
