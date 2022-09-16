import { NextPage } from "next";
import { Container, Heading, Text } from "@chakra-ui/react";
import GetPublications from "./GetPublications";


const AppContainer: NextPage = () => {
  return (
    <Container maxW={"2xl"}>
      <Heading>Next + Chakra + RainbowKit app</Heading>
      <Text>Boilerplate repo for basic web3 frontend</Text>
      <GetPublications /> 
    </Container>
  );
};

export default AppContainer;
