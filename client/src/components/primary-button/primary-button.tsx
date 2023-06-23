import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const PrimaryButton = ({ children, ...others }: ButtonProps) => {
  return <StyledButton {...others}>{children}</StyledButton>;
};

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.white,
}));
