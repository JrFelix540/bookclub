import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const SecondaryButton: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled(Button)<ButtonProps>(({ theme, variant }) => ({
  color:
    variant === "outline" ? theme.palette.text.main : theme.palette.gray.dark,
  backgroundColor:
    variant === "outline" ? "transparent" : theme.palette.gray.light,
  "&:hover": {
    color: theme.palette.gray.dark,
  },
}));
