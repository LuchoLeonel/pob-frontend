import type { AppProps } from "next/app";
import {
  lightTheme,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useColorModeValue } from "@chakra-ui/react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import "@rainbow-me/rainbowkit/styles.css";
import Layout from "../components/Layout/Layout";
import { FC, ReactNode } from "react";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Logo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const rainbowTheme = useColorModeValue(lightTheme, darkTheme);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={rainbowTheme({
          accentColor: "#8FC837",
          borderRadius: "medium",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
