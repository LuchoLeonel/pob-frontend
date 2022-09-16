import {
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import MovementCard from "../../components/MovementCard/MovementCard";

type Props = {};

const Movements: NextPage = (props: Props) => {
  return (
    <Container minW={"100%"} maxH={"85vh"} overflowY={"scroll"}>
      <Container
        maxW={{ base: "xl", md: "2xl", lg: "4xl", xl: "5xl", "2xl": "6xl" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={"20px"}
      >
        <Heading>My Movements</Heading>
        <Flex align={"center"} w={"100%"} justifyContent={"space-around"}>
          <Text cursor={"pointer"} as={"b"}>
            Purchases
          </Text>
          <Center height="50px">
            <Divider orientation="vertical" />
          </Center>
          <Text cursor={"pointer"} as={"b"}>
            Sells
          </Text>
        </Flex>
        <MovementCard
          image="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="Mercedes Benz 2021"
          price={25}
          seller={"Random v1"}
          sellerProfile={"random"}
          actualButtonState={{ loading: false, disabled: false }}
          recived={false}
        />
      </Container>
    </Container>
  );
};

export default Movements;
