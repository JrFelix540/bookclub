import { ClubsDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { List, ListItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";

export const ClubsSidebar = () => {
  const { data, loading } = useQuery(ClubsDocument);
  return (
    <Container>
      <Text align="center" fontSize="xl" fontWeight="bold">
        Our BookClubs
      </Text>
      <List>
        {data?.allCommunities.map((comm) => (
          <StyledItem key={comm.id}>
            <Link href={`/clubs/${comm.id}`}>{comm.name}</Link>
          </StyledItem>
        ))}
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
