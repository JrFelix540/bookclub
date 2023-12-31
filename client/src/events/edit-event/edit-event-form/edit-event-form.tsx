import { Input, Textarea } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/primary-button/primary-button";
import { SelectInput } from "@/components/select-input/select-input";
import { ClubEventQuery, UpdateClubEventDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { editEventSchema, updateEventCache } from "./edit-event-form.utils";
import { DateInput } from "@/components/date-picker/date-picker";

interface EditEventFormProps {
  event: ClubEventQuery["clubEvent"];
}
export const EditEventForm: React.FC<EditEventFormProps> = ({ event }) => {
  const [updateClubEvent, { loading }] = useMutation(UpdateClubEventDocument);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
      meetingLink: event.meetingLink,
      duration: event.duration,
    },
    onSubmit: async (values) => {
      const { data, errors } = await updateClubEvent({
        variables: {
          id: event.id,
          ...values,
        },
        update: (cache, { data }) => {
          if (data) {
            updateEventCache(data.updateClubEvent, cache);
          }
        },
      });
      if (errors) {
        console.log("An error occurred while updating the event");
      }
      if (data) {
        router.push(`/clubs/events/${data.updateClubEvent.id}`);
      }
    },
    enableReinitialize: true,
    validationSchema: editEventSchema,
  });
  const handleDateChange = (date: Date) => {
    formik.setFieldValue("date", date.toISOString());
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
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
        touched={formik.touched.description}
      />
      <EventScheduleContainer>
        <DateInput
          id="date"
          name="date"
          value={formik.values.date}
          error={formik.errors.date}
          touched={formik.touched.date}
          label="Start Time"
          onBlur={formik.handleBlur}
          onChange={handleDateChange}
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
          Update Event
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
