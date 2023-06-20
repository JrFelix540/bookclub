import styled from "@emotion/styled";
import { BaseLayout } from "./base-layout";
import { Text } from "@chakra-ui/react";

export const ErrorPage = () => {
  return (
    <BaseLayout title="Error Page">
      <Container>
        <Text>Something wrong has happened</Text>
      </Container>
    </BaseLayout>
  );
};

const Container = styled("main")({
  minHeight: "100vh",
  display: "grid",
  placeContent: "center",
});
