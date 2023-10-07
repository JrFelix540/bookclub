import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { PopularEventsDocument } from "@/generated/graphql";
import { TopEvent } from "../top-event/top-event";

export const EventsSidebar = () => {
  const { data } = useQuery(PopularEventsDocument);

  return (
    <Container direction="column" gap="20px">
      <Text fontWeight="extrabold" fontSize="xl">
        Trending Events
      </Text>
      {data?.popularEvents.length === 0 && (
        <Flex justifyContent="center" alignItems="center" height="72">
          <p>No top events for now :(</p>
        </Flex>
      )}
      {data?.popularEvents.map((event) => (
        <TopEvent
          key={event.id}
          id={event.id}
          date={event.date}
          club={event.club}
          duration={event.duration}
          title={event.title}
        />
      ))}
    </Container>
  );
};

const Container = styled(Flex)(({ theme }) => ({
  background: theme.palette.background.secondary,
  padding: "20px",
  borderRadius: "16px",
}));
