import { EventPreview } from "@/components/event-preview/event-preview";
import { ClubEventsWithIdDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

export const ClubEvents: React.FC<{ id: number }> = ({ id }) => {
  const { data } = useQuery(ClubEventsWithIdDocument, {
    variables: { clubId: id, limit: 10 },
  });

  return (
    <Flex direction="column" gap="10px">
      {data?.clubEventsWithId.length === 0 && (
        <Flex alignItems="center" direction="column">
          <ImageContainer>
            <Image src="/no-events.png" alt="no events fetched" fill />
          </ImageContainer>
          <p>Currently, this bookclub has no events :(</p>
        </Flex>
      )}
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

const ImageContainer = styled("div")({
  height: "300px",
  width: "100%",
  position: "relative",
  img: {
    objectFit: "contain",
  },
});
