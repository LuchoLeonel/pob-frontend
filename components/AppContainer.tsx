import { NextPage } from "next";
import { Container, Heading, Text } from "@chakra-ui/react";


const AppContainer: NextPage = () => {
  return (
    <Container maxW={"2xl"}>
      <Heading>Next + Chakra + RainbowKit app</Heading>
      <Text>Boilerplate repo for basic web3 frontend</Text>
    </Container>
  );
};

export default AppContainer;
