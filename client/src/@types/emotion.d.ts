import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    palette: {
      primary: string;
      text: {
        main: string;
        secondary: string;
        tertiary: string;
      };
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      white: string;
      gray: {
        light: string;
        dark: string;
        main: string;
      };
      blue: {
        main: string;
      };
    };
  }
}
