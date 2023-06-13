import { Logo } from "@/components/Logo/Logo";
import styled from "@emotion/styled";

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Container>
      <Content>
        <Logo />
        {children}
      </Content>
    </Container>
  );
};

const Container = styled("main")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
});
