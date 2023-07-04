import { EditEvent } from "@/events/edit-event/edit-event";
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

export default EditEvent;
