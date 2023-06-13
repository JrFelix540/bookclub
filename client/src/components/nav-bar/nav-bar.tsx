import { Avatar, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Logo } from "../Logo/Logo";
import { PrimaryButton } from "../primary-button/primary-button";
import { MainContainer } from "../main-container/main-container";
import { Menu } from "../menu/menu";

interface NavBarProps {
  id?: number | undefined | null;
  username?: string | undefined | null;
}

export const NavBar: React.FC<NavBarProps> = ({ username }) => {
  return (
    <Header>
      <Container>
        <Link href="/">
          <Logo />
        </Link>
        <MenuContainer>
          <MenuContainer>
            {username ? (
              <>
                <ProfileContainer>
                  <Avatar size={"sm"} />
                  <Text>{username}</Text>
                </ProfileContainer>
                <Menu />
              </>
            ) : (
              <>
                <Link href={"/auth/sign-up"}>
                  <PrimaryButton>Sign Up</PrimaryButton>
                </Link>
                <Link href={"/auth/sign-in"}>
                  <PrimaryButton>Sign In</PrimaryButton>
                </Link>
              </>
            )}
          </MenuContainer>
        </MenuContainer>
      </Container>
    </Header>
  );
};

const Header = styled("header")({
  position: "absolute",
  width: "100%",
  background: "#fff",
  padding: "20px 0",
});

const Container = styled(MainContainer)({
  display: "flex",
  justifyContent: "space-between",
});

const MenuContainer = styled("div")({
  display: "flex",
  gap: "10px",
  position: "relative",
});

const ProfileContainer = styled("div")({
  display: "flex",
  gap: "2px",
  alignItems: "center",
});
