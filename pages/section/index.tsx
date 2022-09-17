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
            <Link href={""}>Computers</Link>
          </ListItem>
          <ListItem>
            <Link href={""}>Cars</Link>
          </ListItem>
          <ListItem>
            <Link href={""}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={""}>Kitchen</Link>
          </ListItem>
          <ListItem>
            <Link href={""}>Supplies</Link>
          </ListItem>
          <ListItem>
            <Link href={""}>Appliances</Link>
          </ListItem>
          <ListItem>
            <Link href={""}>Phones</Link>
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
