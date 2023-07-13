import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { ClubDocument, MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ClubPosts } from "./club-posts";
import { ClubSidebar } from "@/components/club-sidebar/club-sidebar";
import { NextPage } from "next";
import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import {
  TabList,
  Tabs,
  Text,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import { ClubLoading } from "./club-loading";
import { ErrorPage } from "@/layouts/error";
import { Avatar } from "@/components/avatar/avatar";
import Image from "next/image";
import { ClubEvents } from "./club-events/club-events";
import { breakpoint } from "@/theme/theme";

export const ClubOverview: NextPage<{ id: number }> = ({ id }) => {
  const { data: meData, loading: meLoading } = useQuery(MeDocument);
  const { data: clubData, loading: clubLoading } = useQuery(ClubDocument, {
    variables: { clubId: id },
  });

  if (!clubData) {
    return clubLoading ? <ClubLoading /> : <ErrorPage />;
  }

  const title = `${clubData.club.name}` || "";
  const description = `${clubData.club.name}: ${clubData.club.description}`;

  return (
    <BaseLayout title={title} description={description}>
      <Navbar loading={meLoading} {...meData?.me} />
      <Container>
        <Flex direction="column" gap="15px">
          <ClubTitle>
            <Avatar size="md" value={clubData.club.name} />
            <Text fontSize="3xl">{clubData.club.name}</Text>
          </ClubTitle>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>
                <Image
                  src="/posts.png"
                  alt="posts tab"
                  height={25}
                  width={25}
                />
                Posts
              </Tab>
              <Tab>
                <Image
                  src="/events.png"
                  alt="events tab"
                  height={25}
                  width={25}
                />
                Events
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex direction="column" gap={"10px"}>
                  <ClubPosts
                    club={{
                      id: clubData.club.id,
                      name: clubData.club.name,
                    }}
                  />
                </Flex>
              </TabPanel>
              <TabPanel>
                <ClubEvents id={clubData.club.id} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        <Flex
          direction="column"
          gap="10px"
          display={{
            base: "none",
            lg: "flex",
          }}
        >
          <ClubSidebar
            id={clubData.club.id}
            name={clubData.club.name}
            dateCreated={clubData.club.dateCreated}
            description={clubData.club.description}
            hasJoined={clubData.club.hasJoined}
          />
          <ClubsSidebar />
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

const ClubTitle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "10px",
  display: "flex",
  borderRadius: "15px",
  gap: "10px",
}));
