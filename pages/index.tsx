import type { NextPage } from "next";

import AppContainer from "../components/AppContainer";

import "@rainbow-me/rainbowkit/styles.css";
import {
  lightTheme,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useColorMode } from "@chakra-ui/react";

const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My Next + Chakra + RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Home: NextPage = () => {
  const { colorMode } = useColorMode();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={colorMode === "light" ? lightTheme() : darkTheme()}
      >
        <AppContainer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Home;
