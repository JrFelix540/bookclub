import { ClubsSidebar } from "@/components/clubs-sidebar/clubs-sidebar";
import { MainContainer } from "@/components/main-container/main-container";
import { NavBar } from "@/components/nav-bar/nav-bar";
import { MeDocument } from "@/generated/graphql";
import { BaseLayout } from "@/layouts/base-layout";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { PostsSection } from "./posts-section";
import { SideBar } from "./sidebar";

export const Landing: React.FC = () => {
  const { data, loading } = useQuery(MeDocument);

  return (
    <BaseLayout title="Bookclub | Home">
      <NavBar {...data?.me} />
      <BodyContainer>
        <Content>
          <PostsSection />
          <SidebarsContainer>
            {data?.me && <SideBar />}
            <ClubsSidebar />
          </SidebarsContainer>
        </Content>
      </BodyContainer>
    </BaseLayout>
  );
};

const BodyContainer = styled("div")({
  minHeight: "100vh",
  backgroundColor: "gray",
  paddingTop: "120px",
});

const Content = styled(MainContainer)({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
});

const SidebarsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
