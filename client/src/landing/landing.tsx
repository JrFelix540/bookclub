import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { Navbar } from "@/components/navbar/navbar";
import { MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { PostsSection } from "./posts-section/posts-section";
import { SideBar } from "./sidebar/sidebar";
import { EventsSidebar } from "@/components/events-sidebar/events-sidebar";
import { breakpoint } from "@/theme/theme";

export const Landing: React.FC = () => {
  const { data, loading } = useQuery(MeDocument);

  return (
    <BaseLayout title="Bookclub | Home">
      <Navbar {...data?.me} loading={loading} />
      <BodyContainer>
        <Content>
          <PostsSection />
          <SidebarsContainer>
            {data?.me && <SideBar />}
            <EventsSidebar />
            <ClubsSidebar />
          </SidebarsContainer>
        </Content>
      </BodyContainer>
    </BaseLayout>
  );
};

const BodyContainer = styled("div")({
  minHeight: "100vh",
  paddingTop: "20px",
});

const Content = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  [breakpoint("lg")]: {
    gridTemplateColumns: "2fr 1fr",
  },
});

const SidebarsContainer = styled("div")({
  display: "none",
  flexDirection: "column",
  gap: "10px",
  [breakpoint("lg")]: {
    display: "flex",
  },
});
