import { PageHead } from "@/components/page-head/page-head";
import { AuthLayout } from "../components/auth-layout/auth-layout";
import { SignInForm } from "./signin-form";
import { Heading } from "@chakra-ui/react";

export const SignIn: React.FC = () => {
  return (
    <>
      <PageHead title="Sign In Page" />
      <AuthLayout>
        <Heading fontSize="2xl">Sign In For Bookclub</Heading>
        <SignInForm />
      </AuthLayout>
    </>
  );
};
