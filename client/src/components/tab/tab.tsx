import { Button, ButtonProps } from "@chakra-ui/react";
import styled from "@emotion/styled";

interface TabProps extends ButtonProps {
  selected?: boolean;
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = (props) => {
  return <StyledTab {...props} fontSize={{ base: "12px", sm: "16px" }} />;
};

const StyledTab = styled(Button)<TabProps>(({ theme, selected }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  color: theme.palette.white,
  backgroundColor: selected ? theme.palette.background.tertiary : "transparent",
}));
