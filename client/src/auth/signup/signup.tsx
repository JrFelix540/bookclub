import { PageHead } from "@/components/page-head/page-head";
import { Heading } from "@chakra-ui/react";
import { AuthLayout } from "../components/auth-layout/auth-layout";
import { SignUpForm } from "./signup-form";

export const SignUp: React.FC = () => {
  return (
    <>
      <PageHead title="Sign Up" />
      <AuthLayout>
        <Heading fontSize="2xl">Sign Up for BookClub</Heading>
        <SignUpForm />
      </AuthLayout>
    </>
  );
};
