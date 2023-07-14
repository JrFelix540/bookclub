import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Avatar } from "../avatar/avatar";
import styled from "@emotion/styled";

interface TopEventProps {
  id: number;
  title: string;
  date: string;
  duration: string;
  club: {
    id: number;
    name: string;
  };
}

export const TopEvent: React.FC<TopEventProps> = ({
  id,
  title,
  date,
  duration,
  club,
}) => {
  const preciseDate = new Date(date).getDate();
  const preciseMonth = new Date(date).toLocaleDateString("en-us", {
    month: "short",
  });

  return (
    <Link key={id} href={`/clubs/events/${id}`}>
      <Flex gap="15px">
        <DateSection direction="column">
          <MonthTypography transform="uppercase">
            {preciseMonth}
          </MonthTypography>
          <DateTypography fontWeight="bold" fontSize="26px">
            {preciseDate}
          </DateTypography>
        </DateSection>
        <Flex direction="column" gap="10px">
          <Text fontWeight={"bold"}>{title}</Text>
          <Flex alignItems="center" gap="5px">
            <Link href={`/clubs/${club.id}`}>
              <Flex alignItems="center" gap="2px">
                <Avatar size="xs" value={club.name} />
                <SecondaryTypography fontSize="xs">
                  {club.name}
                </SecondaryTypography>
              </Flex>
            </Link>
            <span>•</span>
            <SecondaryTypography fontSize="xs">{duration}</SecondaryTypography>
          </Flex>
          <Flex>
            <EventTag>
              <SecondaryTypography fontSize="xs">Online</SecondaryTypography>
            </EventTag>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

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

const DateSection = styled(Flex)(({ theme }) => ({
  background: theme.palette.background.tertiary,
  padding: "4px 10px",
  borderRadius: "6px",
  alignItems: "center",
  justifyContent: "center",
}));
