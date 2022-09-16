import { Button, Container, Heading, List, ListItem } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";

type Props = {};

const Section: NextPage = (props: Props) => {
  return (
    <Container minW={"100%"} maxH={"85vh"} overflowY={"scroll"}>
      <Container
        maxW={{ base: "xl", md: "2xl", lg: "4xl", xl: "5xl", "2xl": "6xl" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={"20px"}
      >
        <Heading>Sections</Heading>
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
        <Link href={"/movements"}>
          <Button>My Movements</Button>
        </Link>
      </Container>
    </Container>
  );
};

export default Section;
