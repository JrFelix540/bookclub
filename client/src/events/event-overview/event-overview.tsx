import { ClubSidebar } from "@/components/club-sidebar/club-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { SecondaryButton } from "@/components/secondary-button/secondary-button";
import { ClubEventDocument, MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { ErrorPage } from "@/layouts/error";
import { useQuery } from "@apollo/client";
import { CheckCircleIcon, CopyIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import { AttendeesSection } from "./attendees-section/attendees-section";
import { DeleteEventModal } from "./delete-event-modal/delete-event-modal";
import { breakpoint } from "@/theme/theme";
import { LoadingPage } from "@/components/loading-page/loading-page";

export const EventOverview: NextPage<{ id: number }> = ({ id }) => {
  const { data, loading } = useQuery(ClubEventDocument, {
    variables: { clubEventId: id },
  });
  const { data: meData, loading: meLoading } = useQuery(MeDocument);

  if (!data) {
    return loading ? <LoadingPage /> : <ErrorPage />;
  }
  const { title, description, date, attendees, creator, meetingLink } =
    data.clubEvent;
  const formattedDate = new Date(data.clubEvent.date).toLocaleDateString(
    "en-us",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    }
  );

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
  };

  const isAttending = attendees.some(
    (attendee) => attendee.id === meData?.me?.id
  );

  return (
    <BaseLayout title={title} description={description}>
      <Navbar {...meData?.me} loading={meLoading} />
      <Container>
        <EventDetails>
          <Flex direction="column" gap="20px">
            <Flex justifyContent="space-between" alignItems="center">
              <Title>{title}</Title>
              {meData?.me?.id === creator.id && (
                <Flex alignItems={"center"}>
                  <Link href={`/clubs/events/edit/${data.clubEvent.id}`}>
                    <EditIcon />
                  </Link>
                  <DeleteEventModal id={id} />
                </Flex>
              )}
            </Flex>
            <time dateTime={date}>{formattedDate}</time>
            <Flex justifyContent="space-between">
              <Flex gap="5px">
                <Popover trigger="hover">
                  <PopoverTrigger>
                    <MeetingLinkText>Copy the Meeting URL</MeetingLinkText>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody> {meetingLink}</PopoverBody>
                  </PopoverContent>
                </Popover>
                <IconButton
                  aria-label="Copy meeting link"
                  icon={<CopyIcon />}
                  onClick={copyMeetingLink}
                />
              </Flex>
            </Flex>
            <AttendeesSection attendees={attendees} />
            <Text>{description}</Text>
            <Flex justifyContent="flex-end">
              <Flex gap="5px" alignItems="center">
                {isAttending ? (
                  <>
                    <Text>Going</Text>
                    <GoingIcon />
                  </>
                ) : (
                  <>
                    <Text>Interested?</Text>
                    <SecondaryButton>Attend Event</SecondaryButton>
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        </EventDetails>
        <Flex
          direction="column"
          gap="10px"
          display={{ base: "none", lg: "flex" }}
        >
          <ClubSidebar
            id={data.clubEvent.club.id}
            name={data.clubEvent.club.name}
            dateCreated={data.clubEvent.club.dateCreated}
            description={data.clubEvent.club.description}
            hasJoined={data.clubEvent.club.hasJoined}
          />
        </Flex>
      </Container>
    </BaseLayout>
  );
};

const Container = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  paddingTop: "20px",
  [breakpoint("lg")]: {
    gridTemplateColumns: "2fr 1fr",
  },
});

const EventDetails = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "20px",
  display: "flex",
  borderRadius: "15px",
  flexDirection: "column",
}));

const MeetingLinkText = styled("div")(({ theme }) => ({
  padding: "7.5px 15px",
  background: theme.palette.background.tertiary,
  color: theme.palette.text.main,
  borderRadius: "10px",
}));

const GoingIcon = styled(CheckCircleIcon)(({ theme }) => ({
  color: theme.palette.primary,
}));

const Title = styled("h1")({
  fontSize: "20px",
  fontWeight: 600,
  lineHeight: "normal",
  [breakpoint("md")]: {
    fontSize: "24px",
  },
});
