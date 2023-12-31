import {
  extendTheme,
  StyleFunctionProps,
  Theme as ChakraTheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Theme } from "@emotion/react";

type CustomTheme = Theme | ChakraTheme;

const theme: CustomTheme = {
  palette: {
    primary: "#FF4401",
    text: {
      main: "#F7F7F7",
      secondary: "#C5D0E6",
      tertiary: "#97989D",
    },
    background: {
      primary: "#1E252B",
      secondary: "#262D34",
      tertiary: "#2C353D",
    },
    white: "#ffffff",
    gray: {
      light: "#EDF2F7",
      dark: "#1A202C",
      main: "#C5D0E6",
    },
    blue: {
      main: "#5D95E8",
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("#1E252B", "#1E252B")(props),
        color: "#F7F7F7",
        colorScheme: "dark",
      },
    }),
  },
  config: {
    initialColorMode: "dark",
  },
};

const breakpoints = [480, 768, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const breakpoint = (variant: "sm" | "md" | "lg") => {
  if (variant === "sm") {
    return mq[0];
  }
  if (variant === "md") {
    return mq[1];
  } else {
    return mq[2];
  }
};

export default extendTheme(theme);
