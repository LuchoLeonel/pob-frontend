import {
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Show,
  Button,
  Text,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeSwitcher from "../ThemeSwitcher";
import Link from "next/link";
import {
  AddIcon,
  HamburgerIcon,
  PlusSquareIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import { useAccount } from 'wagmi'
import {useState, useEffect} from 'react';
import { apolloClient } from "../../api/apollo";
import { GET_CHALLENGE, AUTHENTICATION } from "../../api/querys";
import { ethers } from 'ethers'
import { checkStorage, clearStorage } from "../../utils/utils";
import NewPostModal from "../NewPost";


type Props = {
  children: JSX.Element;
};

declare var window: any;

const Layout = ({ children }: Props) => {
  const { address, isConnected } = useAccount();
  const [connected, setConnected] = useState(false);
  const [connectedLens, setConnectedLens] = useState(false);

  const { isOpen: newPostModalIsOpen, onOpen: newPostModalOnOpen, onClose: newPostModalOnClose } = useDisclosure();

  useAccount({
    onDisconnect() {
      clearStorage();
    },
  });

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
    };

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
    const signature = await ethersProvider
      .getSigner()
      .signMessage(challenge.data.challenge.text);

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
    setConnectedLens(true);
    return;
  }

  return (
    <>
      <NewPostModal isOpen={newPostModalIsOpen} onClose={newPostModalOnClose} onOpen={newPostModalOnOpen} />
      <Box>
        <Flex flexDirection={"row"} justifyContent={"stretch"} height={"100%"}>
          <Flex
            display={{ base: "none", md: "none", lg: "flex" }}
            width={"300px"}
            height={"100vh"}
            paddingLeft={"40px"}
            paddingTop={"24px"}
            flexDirection={"column"}
            gap={"42px"}
          >
            <Heading>Logo</Heading>
            <Button onClick={newPostModalOnOpen}>Create new post</Button>
            <Box height={"50%"}>
              <Text as="b" fontSize={"xl"}>
                Sections
              </Text>
              <List
                display={"flex"}
                flexDirection={"column"}
                paddingLeft={"12px"}
                gap={"12px"}
                marginTop={"12px"}
              >
                <ListItem>
                  <Link href={""}>Section 1</Link>
                </ListItem>
                <ListItem>
                  <Link href={""}>Section 2</Link>
                </ListItem>
                <ListItem>
                  <Link href={""}>Section 3</Link>
                </ListItem>
                <ListItem>
                  <Link href={""}>Section 4</Link>
                </ListItem>
                <ListItem>
                  <Link href={""}>Section 5</Link>
                </ListItem>
                <ListItem>
                  <Link href={""}>Section 6</Link>
                </ListItem>
                <ListItem>
                  <Link href={""}>Section 7</Link>
                </ListItem>
              </List>
            </Box>
            <Button>My Purchases</Button>
            <Button>My Sells</Button>
          </Flex>
          <Flex
            flexDirection={"column"}
            width={"100%"}
            height={"100%"}
            gap={"32px"}
          >
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
                    <Button colorScheme={"teal"} onClick={connecToLens}>
                      Connect to Lens{" "}
                    </Button>
                  ) : (
                    <ConnectButton />
                  )}
                  <ThemeSwitcher />
                </HStack>
              </Box>
            </Flex>
            {children}
            <Box
              position={"fixed"}
              bottom={0}
              left={0}
              flexDirection={"row"}
              width={"100%"}
              height={"80px"}
              backgroundColor={"teal"}
              display={{ base: "flex", md: "flex", lg: "none" }}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <HamburgerIcon w={10} h={10} cursor={"pointer"} />
              <PlusSquareIcon w={10} h={10} cursor={"pointer"} />
              <SearchIcon w={10} h={10} cursor={"pointer"} />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
