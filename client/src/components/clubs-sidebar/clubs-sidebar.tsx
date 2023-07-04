import { PopularClubsDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { List, ListItem, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Avatar } from "../avatar/avatar";
import { ClubsSidebarLoading } from "./clubs-sidebar.loading";

export const ClubsSidebar = () => {
  const { data, loading } = useQuery(PopularClubsDocument);
  if (!data) {
    return loading ? <ClubsSidebarLoading /> : <p>Something has occurred.</p>;
  }

  return (
    <Container>
      <Text align="left" fontSize="xl" fontWeight="extrabold">
        Trending Bookclubs
      </Text>
      <List>
        {data.popularClubs.map((club) => (
          <StyledItem key={club.id}>
            <StyledLink href={`/clubs/${club.id}`}>
              <Avatar value={club.name} size="md" square={true} />
              <TextContainer>
                <Name>{club.name}</Name>
                <Description>{club.numberOfMembers} members</Description>
              </TextContainer>
            </StyledLink>
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
  padding: "10px 0",
});

const StyledLink = styled(Link)(({ theme }) => ({
  display: "flex",
  gap: "5px",
}));

const TextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "5px",
});

const Name = styled(Text)({
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "18px",
});

const Description = styled(Text)(({ theme }) => ({
  color: theme.palette.text.tertiary,
  fontSize: "12px",
  lineHeight: "16px",
}));
