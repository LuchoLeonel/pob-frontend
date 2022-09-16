import { NextPage } from "next";
import { Container, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeSwitcher from "./ThemeSwitcher";

const AppContainer: NextPage = () => {
  return (
    <Container maxW={"2xl"}>
      <Heading>Next + Chakra + RainbowKit app</Heading>
      <Text>Boilerplate repo for basic web3 frontend</Text>
    </Container>
  );
};

export default AppContainer;
