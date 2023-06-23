import {
  ClubsDocument,
  JoinCommunityDocument,
  MeDocument,
  PostDocument,
} from "@/generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "../primary-button/primary-button";
import { Avatar } from "../avatar/avatar";
import { useRouter } from "next/router";

interface ClubSidebarProps {
  id: number;
  name: string;
  description: string;
  dateCreated: string;
  hasJoined: boolean | null | undefined;
}

export const ClubSidebar: React.FC<ClubSidebarProps> = ({
  id,
  name,
  description,
  dateCreated,
  hasJoined,
}) => {
  const { data } = useQuery(MeDocument);
  const router = useRouter();
  const [joinClub] = useMutation(JoinCommunityDocument, {
    variables: { communityId: id },
    refetchQueries: [PostDocument, ClubsDocument],
  });

  const join = () => {
    if (!data?.me) {
      router.push("/auth/sign-up");
    }
    joinClub();
  };
  return (
    <Container>
      <TitleContainer>
        <Avatar value={name} size="md" />
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

const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
  padding: "20px 10px",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
});

const JoinedContainer = styled("div")(({ theme }) => ({
  border: `2px solid ${theme.palette.primary}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  borderRadius: "15px",
}));
