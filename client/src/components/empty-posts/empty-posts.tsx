import styled from "@emotion/styled";

export const EmptyPosts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};

const Container = styled("div")(({ theme }) => ({
  height: "200px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: theme.palette.background.secondary,
  borderRadius: "15px",
}));
