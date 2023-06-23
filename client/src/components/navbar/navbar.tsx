import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Logo } from "../Logo/Logo";
import { Avatar } from "../avatar/avatar";
import { MainContainer } from "../main-container/main-container";
import { Menu } from "../menu/menu";
import { PrimaryButton } from "../primary-button/primary-button";
import { NavbarLoading } from "./navbar.loading";

interface NavbarProps {
  id?: number | undefined | null;
  username?: string | undefined | null;
  loading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ username, loading }) => {
  if (loading) {
    return <NavbarLoading />;
  }
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
                  <Avatar size={"sm"} value={username} />
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

const Header = styled("header")(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.secondary,
  padding: "20px 0",
}));

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
