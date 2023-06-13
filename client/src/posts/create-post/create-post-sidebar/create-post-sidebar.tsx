import { List, ListItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const CreatePostSidebar = () => {
  return (
    <Container>
      <Text align="center">Bookclub Rules</Text>
      <List>
        <StyledItem>1. Be respectful to others.</StyledItem>
        <StyledItem>2. No Hateful language in</StyledItem>
        <StyledItem>3. Have fun and enjoy</StyledItem>
      </List>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  background: "#fff",
  padding: "10px 15px",
  borderRadius: "15px",
});

const StyledItem = styled(ListItem)({
  padding: "10px",
  borderBottom: "1px solid #e7e7de",
});
