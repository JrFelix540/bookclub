import { Button, ButtonProps } from "@chakra-ui/react";

export const PrimaryButton = ({ children, ...others }: ButtonProps) => {
  return (
    <Button backgroundColor="#0f3057" color="#fff" {...others}>
      {children}
    </Button>
  );
};
