import { EventPreview } from "@/components/event-preview/event-preview";
import { ClubEventsWithIdDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";

export const ClubEvents: React.FC<{ id: number }> = ({ id }) => {
  const { data } = useQuery(ClubEventsWithIdDocument, {
    variables: { clubId: id, limit: 10 },
  });

  return (
    <Container>
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
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
}));
