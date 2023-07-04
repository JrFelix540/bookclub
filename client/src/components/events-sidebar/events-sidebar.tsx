import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Avatar } from "../avatar/avatar";
import { useQuery } from "@apollo/client";
import { PopularEventsDocument } from "@/generated/graphql";
import Link from "next/link";

export const EventsSidebar = () => {
  const { data } = useQuery(PopularEventsDocument);
  return (
    <Container direction="column" gap="20px">
      <Text fontWeight="extrabold" fontSize="xl">
        Trending Events
      </Text>
      {data?.popularEvents.map((event) => (
        <Link key={event.id} href={`/clubs/events/${event.id}`}>
          <Flex gap="15px">
            <DateSection direction="column">
              <MonthTypography transform="uppercase">Feb</MonthTypography>
              <DateTypography fontWeight="bold" fontSize="26px">
                3
              </DateTypography>
            </DateSection>
            <Flex direction="column" gap="10px">
              <Text fontWeight={"bold"}>{event.title}</Text>
              <Flex alignItems="center" gap="5px">
                <Link href={`/clubs/${event.club.id}`}>
                  <Flex alignItems="center" gap="2px">
                    <Avatar size="xs" value={event.club.name} />
                    <SecondaryTypography fontSize="xs">
                      {event.club.name}
                    </SecondaryTypography>
                  </Flex>
                </Link>
                <span>•</span>
                <SecondaryTypography fontSize="xs">
                  {event.duration}
                </SecondaryTypography>
              </Flex>
              <Flex>
                <EventTag>
                  <SecondaryTypography fontSize="xs">
                    Online
                  </SecondaryTypography>
                </EventTag>
              </Flex>
            </Flex>
          </Flex>
        </Link>
      ))}
    </Container>
  );
};

const Container = styled(Flex)(({ theme }) => ({
  background: theme.palette.background.secondary,
  padding: "20px",
  borderRadius: "16px",
}));

const DateSection = styled(Flex)(({ theme }) => ({
  background: theme.palette.background.tertiary,
  padding: "4px 10px",
  borderRadius: "6px",
  alignItems: "center",
  justifyContent: "center",
}));

const EventTag = styled(Flex)(({ theme }) => ({
  padding: "2px 8px",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.tertiary,
  borderRadius: "20px",
}));

const MonthTypography = styled(Text)({
  textTransform: "uppercase",
});

const SecondaryTypography = styled(Text)(({ theme }) => ({
  color: theme.palette.text.tertiary,
}));

const DateTypography = styled(Text)(({ theme }) => ({
  color: theme.palette.blue.main,
}));
