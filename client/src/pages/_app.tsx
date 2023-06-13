import { useApollo } from "@/providers/apollo/use-apollo.hook";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} className={inter.className} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
