import { Box, BoxProps } from "@chakra-ui/react";

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer: React.FC<MainContainerProps & BoxProps> = ({
  children,
  ...others
}) => {
  return (
    <Box
      maxW={{
        base: "none",
        sm: "none",
        md: "576px",
        lg: "768px",
        xl: "1140px",
      }}
      paddingX={{
        base: "20px",
        sm: "20px",
        md: "none",
        lg: "none",
        xl: "none",
      }}
      m={"0 auto"}
      {...others}
    >
      {children}
    </Box>
  );
};
