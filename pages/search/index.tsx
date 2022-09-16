import { Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

type Props = {};

const Search: NextPage = (props: Props) => {
  return (
    <Container minW={"100%"} maxH={"85vh"} overflowY={"scroll"}>
      <Container
        maxW={{ base: "xl", md: "2xl", lg: "4xl", xl: "5xl", "2xl": "6xl" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={"20px"}
      >
        <Heading>Search</Heading>
      </Container>
    </Container>
  );
};

export default Search;
