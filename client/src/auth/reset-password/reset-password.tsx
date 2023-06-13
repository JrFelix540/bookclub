import { PageHead } from "@/components/page-head/page-head";
import { AuthLayout } from "../components/auth-layout/auth-layout";
import { Heading } from "@chakra-ui/react";
import { ResetPasswordForm } from "./reset-passord-form";

export const ResetPassword: React.FC = () => {
  return (
    <>
      <PageHead title="Reset Password" />
      <AuthLayout>
        <Heading fontSize="2xl">Reset Password</Heading>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
};
