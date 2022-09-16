import { SearchIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading, IconButton, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
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
        <Flex
          alignItems={"center"}
          gap={2}
          display={{ base: "flex", md: "flex", lg: "none" }}
          w={"100%"}
        >
          <Input placeholder="Search" size="lg" w={"100%"} />
          <Link href={"/search"}>
            <IconButton
              aria-label="Search database"
              w={12}
              h={12}
              icon={<SearchIcon />}
            />
          </Link>
        </Flex>
      </Container>
    </Container>
  );
};

export default Search;
