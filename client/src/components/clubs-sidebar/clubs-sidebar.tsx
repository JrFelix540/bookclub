import { ClubsDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { List, ListItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { LoadingClubSidebar } from "../club-sidebar/club-sidebar.loading";

export const ClubsSidebar = () => {
  const { data, loading } = useQuery(ClubsDocument);
  if (!data) {
    return loading ? <LoadingClubSidebar /> : <p>Something has occurred.</p>;
  }

  return (
    <Container>
      <Text align="center" fontSize="xl" fontWeight="bold">
        Our BookClubs
      </Text>
      <List>
        {data.allCommunities.map((comm) => (
          <StyledItem key={comm.id}>
            <Link href={`/clubs/${comm.id}`}>{comm.name}</Link>
          </StyledItem>
        ))}
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
