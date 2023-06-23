import { useApollo } from "@/providers/apollo/use-apollo.hook";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Source_Sans_3 } from "next/font/google";
import theme from "../theme/theme";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} className={sourceSans3.className} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
