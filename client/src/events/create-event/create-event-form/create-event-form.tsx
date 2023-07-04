import { PrimaryButton } from "@/components/primary-button/primary-button";
import { useFormik } from "formik";
import { Input, Textarea } from "@/components/Input/Input";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "@apollo/client";
import { CreateClubEventDocument, MyClubsDocument } from "@/generated/graphql";
import { SelectInput } from "@/components/select-input/select-input";
import { useRouter } from "next/router";
import { createEventSchema } from "./create-event-form.utils";

export const CreateEventForm = () => {
  const router = useRouter();
  const [createClubEvent, { loading }] = useMutation(CreateClubEventDocument);
  const { data } = useQuery(MyClubsDocument);

  const defaultClubId = data?.meWithClubs?.memberClubs[0].id.toString();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      meetingLink: "",
      duration: "30 min",
      clubId: defaultClubId || "",
    },
    onSubmit: async ({ clubId, ...otherValues }) => {
      const { data, errors } = await createClubEvent({
        variables: {
          clubId: parseInt(clubId),
          ...otherValues,
        },
      });

      if (errors) {
        console.log(errors);
      }

      if (data) {
        router.push(`/clubs/events/${data.createClubEvent.id}`);
      }
    },
    enableReinitialize: true,
    validationSchema: createEventSchema,
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <SelectInput
        id="clubId"
        name="clubId"
        placeholder="Select bookclub"
        value={formik.values.clubId}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      >
        {data?.meWithClubs?.memberClubs.map((club) => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </SelectInput>
      <Input
        id="title"
        name="title"
        type="text"
        label="Event Title"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
        onBlur={formik.handleBlur}
        touched={formik.touched.title}
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
        onBlur={formik.handleBlur}
      />
      <EventScheduleContainer>
        <Input
          id="date"
          name="date"
          type="datetime-local"
          value={formik.values.date}
          error={formik.errors.date}
          touched={formik.touched.date}
          label="Start Time"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <SelectInput
          id="duration"
          name="duration"
          placeholder="select duration"
          label="Duration"
          touched={formik.touched.duration}
          error={formik.errors.duration}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.duration}
        >
          <option value="30 min">30 min</option>
          <option value="1h">1 hr</option>
          <option value="2h">2 hrs</option>
          <option value="3h">3 hrs</option>
        </SelectInput>
      </EventScheduleContainer>
      <div>
        <Input
          id="meetingLink"
          name="meetingLink"
          type="text"
          value={formik.values.meetingLink}
          error={formik.errors.meetingLink}
          touched={formik.touched.meetingLink}
          label="Meeting Link"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <ButtonContainer>
        <PrimaryButton type="submit" isLoading={loading}>
          Create Event
        </PrimaryButton>
      </ButtonContainer>
    </Form>
  );
};

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
});

const EventScheduleContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "10px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});
