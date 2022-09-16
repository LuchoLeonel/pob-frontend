import { Box, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextComponentType } from "next";
import ThemeSwitcher from "../ThemeSwitcher";
import { useAccount } from 'wagmi'
import {useState, useEffect} from 'react';
import { apolloClient } from "../../api/apollo";
import { GET_CHALLENGE, AUTHENTICATION } from "../../api/querys";
import { ethers } from 'ethers'
import { checkStorage, clearStorage } from "../../utils/utils";


type Props = {
  children: JSX.Element;
};

declare var window: any

const Layout = ({ children }: Props) => {
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
    <Box>
      <Flex flexDirection={"row"} justifyContent={"stretch"} height={"100%"}>
        <Flex
          display={{ base: "none", md: "none", lg: "flex" }}
          width={"300px"}
          height={"100vh"}
          paddingLeft={"40px"}
          paddingTop={"24px"}
        >
          <Heading>Logo</Heading>
        </Flex>
        <Flex flexDirection={"column"} width={"100%"} height={"100%"}>
          <Flex
            alignItems="center"
            justifyContent={"space-between"}
            width={{ base: "100%", md: "100%", lg: "auto" }}
            height={"90px"}
            paddingLeft={{ base: "20px", md: "20px", lg: "40px" }}
            paddingRight={{ base: "10px", md: "10px", lg: "40px" }}
            alignSelf={"flex-end"}
            gap="2"
          >
            <Heading display={{ base: "block", md: "block", lg: "none" }}>
              Logo
            </Heading>
            <Box>
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
            </Box>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
