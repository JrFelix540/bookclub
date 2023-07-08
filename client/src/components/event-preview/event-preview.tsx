import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";

interface EventPreviewProps {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: string;
}
export const EventPreview: React.FC<EventPreviewProps> = ({
  id,
  title,
  description,
  date,
}) => {
  const preciseDate = new Date(date).getDate();
  const preciseMonth = new Date(date).toLocaleDateString("en-us", {
    month: "short",
  });
  return (
    <Link href={`/clubs/events/${id}`}>
      <Container>
        <DateSection direction="column">
          <MonthTypography transform="uppercase">
            {preciseMonth}
          </MonthTypography>
          <DateTypography fontWeight="bold" fontSize="26px">
            {preciseDate}
          </DateTypography>
        </DateSection>
        <Flex direction="column" gap="5px">
          <Text fontSize="xl">{title}</Text>
          <Flex>
            <EventTag>
              <SecondaryTypography fontSize="xs">Online</SecondaryTypography>
            </EventTag>
          </Flex>
          <Text noOfLines={2}>{description}</Text>
        </Flex>
      </Container>
    </Link>
  );
};
const Container = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "15px",
  backgroundColor: theme.palette.background.secondary,
  padding: "10px",
  borderRadius: "15px",
}));

const DateSection = styled(Flex)(({ theme }) => ({
  background: theme.palette.background.tertiary,
  padding: "4px 10px",
  borderRadius: "6px",
  alignItems: "center",
  justifyContent: "center",
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

const EventTag = styled(Flex)(({ theme }) => ({
  padding: "2px 8px",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.tertiary,
  borderRadius: "20px",
}));
