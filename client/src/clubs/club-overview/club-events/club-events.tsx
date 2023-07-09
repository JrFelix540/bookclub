import { EventPreview } from "@/components/event-preview/event-preview";
import { ClubEventsWithIdDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";

export const ClubEvents: React.FC<{ id: number }> = ({ id }) => {
  const { data } = useQuery(ClubEventsWithIdDocument, {
    variables: { clubId: id, limit: 10 },
  });

  return (
    <Flex direction="column" gap="10px">
      {data?.clubEventsWithId.map((event) => (
        <EventPreview
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          duration={event.duration}
        />
      ))}
    </Flex>
  );
};
