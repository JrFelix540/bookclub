import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { PrimaryButton } from "../primary-button/primary-button";
import { useQuery } from "@apollo/client";
import {
  ClubsDocument,
  CommunityDocument,
  MeDocument,
} from "@/generated/graphql";

export const ClubSidebar: React.FC<{ clubId: number }> = ({ clubId }) => {
  const { data } = useQuery(CommunityDocument, {
    variables: { communityId: clubId },
  });
  const { data: MeData } = useQuery(MeDocument);

  return (
    <Container>
      <TitleContainer>
        <Image src="/book.png" alt="logo" width={20} height={20} />
        <Text>c/{data?.community.name}</Text>
      </TitleContainer>
      <Text>{data?.community.description}</Text>
      <Text>Created on {data?.community.dateCreated}</Text>
      {/* {isMember ? (
        <JoinedContainer>Joined</JoinedContainer>
      ) : (
        <PrimaryButton>Join Club</PrimaryButton>
      )} */}
    </Container>
  );
};

const Container = styled("div")({
  backgroundColor: "#fff",
  padding: "20px 10px",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "5px",
});

const JoinedContainer = styled("div")({
  border: "2px solid #0f3057",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  borderRadius: "15px",
});
