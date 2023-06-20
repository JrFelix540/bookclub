import {
  ClubsDocument,
  JoinCommunityDocument,
  PostDocument,
} from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "../primary-button/primary-button";

interface ClubSidebarProps {
  id: number;
  name: string;
  description: string;
  dateCreated: string;
  hasJoined: boolean;
}

export const ClubSidebar: React.FC<ClubSidebarProps> = ({
  id,
  name,
  description,
  dateCreated,
  hasJoined,
}) => {
  const [joinClub] = useMutation(JoinCommunityDocument, {
    variables: { communityId: id },
    refetchQueries: [PostDocument, ClubsDocument],
  });

  const join = () => {
    joinClub();
  };
  return (
    <Container>
      <TitleContainer>
        <Image src="/book.png" alt="logo" width={20} height={20} />
        <Link href={`/clubs/${id}`}>
          <Text>c/{name}</Text>
        </Link>
      </TitleContainer>
      <Text>{description}</Text>
      <Text>Created on {dateCreated}</Text>
      {hasJoined ? (
        <JoinedContainer>Joined</JoinedContainer>
      ) : (
        <PrimaryButton onClick={join}>Join Club</PrimaryButton>
      )}
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
