import { Avatar } from "@/components/avatar/avatar";
import { ClubEventQuery } from "@/generated/graphql";
import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

interface AttendeesSectionProps {
  attendees: ClubEventQuery["clubEvent"]["attendees"];
}
export const AttendeesSection: React.FC<AttendeesSectionProps> = ({
  attendees,
}) => {
  const showCasedAttendees = attendees.slice(0, 4);
  const noOfAttendees = attendees.length;

  return (
    <Flex direction="column" gap="10px">
      <SecondaryText>{noOfAttendees} attending</SecondaryText>
      <Flex>
        {showCasedAttendees.map((attendee) => (
          <Avatar key={attendee.id} value={attendee.username} />
        ))}
      </Flex>
    </Flex>
  );
};

const SecondaryText = styled(Text)(({ theme }) => ({
  color: theme.palette.text.tertiary,
  fontSize: "14px",
}));
