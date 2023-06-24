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
};

export default extendTheme(theme);
