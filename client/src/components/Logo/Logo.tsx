import Image from "next/image";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { breakpoint } from "@/theme/theme";

export const Logo = () => {
  return (
    <Container>
      <Image src={"/logo.png"} alt="BookClub Logo" height={40} width={40} />
      <StyledText>Bookclub</StyledText>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const StyledText = styled(Text)(({ theme }) => ({
  color: theme.palette.white,
  fontWeight: 900,
  lineHeight: "24px",
  fontSize: "18px",
  [breakpoint("lg")]: {
    fontSize: "28px",
  },
}));
