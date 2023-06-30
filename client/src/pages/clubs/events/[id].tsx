import { EventOverview } from "@/events/event-overview/event-overview";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{ id: number }> = async ({
  params,
}) => {
  const { id } = params as { id: string };
  const eventId = parseInt(id);

  return {
    props: {
      id: eventId,
    },
  };
};

export default EventOverview;
