import { NextPage } from "next";
import { Container, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAccount } from 'wagmi'
import {useState, useEffect, useCallback} from 'react';
import { apolloClient } from "./apollo";
import { GET_CHALLENGE, AUTHENTICATION } from "./querys";
import { ethers } from 'ethers'
import { checkStorage, clearStorage } from "./utils";


declare var window: any

const AppContainer: NextPage = () => {
  const { address, isConnected } = useAccount()
  const [connected, setConnected] = useState(false);
  const [connectedLens, setConnectedLens] = useState(false);

  useAccount({
    onDisconnect() {
      clearStorage();
    },
  })

  useEffect(() => {
    const main = async () => {
      if (isConnected) {
        setConnected(true);
      } else {
        setConnected(false);
      }
  
      if (await checkStorage()) {
        setConnectedLens(true);
      } else {
        setConnectedLens(false);
      }
    }

    main();
  }, [isConnected, connected, connectedLens, checkStorage]);


  async function connecToLens() {
    const challenge = await apolloClient.query({
      query: GET_CHALLENGE,
      variables: {
        request: {
           address,
        },
      },
    });

    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signature = await ethersProvider.getSigner().signMessage(challenge.data.challenge.text);

    const token = await apolloClient.mutate({
      mutation: AUTHENTICATION,
      variables: {
        request: {
          address,
          signature,
        },
      },
    });
    localStorage.setItem("accessToken", token.data.authenticate.accessToken);
    localStorage.setItem("refreshToken", token.data.authenticate.refreshToken);
    setConnectedLens(true)
    return;
  }

  return (
    <Container maxW={"2xl"}>
      <HStack m={4} spacing={4}>
        <Spacer />
        {connected && !connectedLens ? (
          <div>
            <button onClick={connecToLens} > Connect to Lens </button>
          </div>
        ) : (
          <ConnectButton />
        )}
        <ThemeSwitcher />
      </HStack>
      <Heading>Next + Chakra + RainbowKit app</Heading>
      <Text>Boilerplate repo for basic web3 frontend</Text>
    </Container>
  );
};

export default AppContainer;
