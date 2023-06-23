import { List, ListItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const RulesSidebar = () => {
  return (
    <Container>
      <Text align="center" fontSize="xl" fontWeight="bold">
        Bookclub Rules
      </Text>
      <List>
        <StyledItem>1. Be respectful to others.</StyledItem>
        <StyledItem>2. No hateful language.</StyledItem>
        <StyledItem>3. Have fun and enjoy.</StyledItem>
      </List>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  background: theme.palette.background.secondary,
  padding: "10px 15px",
  borderRadius: "15px",
}));

const StyledItem = styled(ListItem)({
  padding: "10px",
  borderBottom: "1px solid #e7e7de",
});
