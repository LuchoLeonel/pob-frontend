import {
  Box,
  Button,
  Container,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  VStack,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import CommentBox from "../../components/CommentBox";
import { FcLike, FcShare } from "react-icons/fc";

type Props = {};

type PublicationData = {
  title: string;
  description: string;
  image_url: string;
  pub_address: string;
  pub_id: string;
  price: string;
};

const defaultData = {
  title: "",
  description: "",
  image_url: "",
  pub_address: "",
  pub_id: "",
  price: "",
};

const Publication: NextPage = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<PublicationData>();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://pastebin.com/raw/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [router.isReady]);

  if (!data)
    return (
      <Flex w="full" h="full">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          m="auto"
        />
      </Flex>
    );

  const comments = Array(10)
    .fill("")
    .map((_, i) => "_Comment_ #" + i)
    .map((e, i) => {
      return (
        <Box key={i} w="full" p="3">
          <Text>...: 23:24, dice:</Text>
          <Text color="#777">
            <ReactMarkdown>{e}</ReactMarkdown>
          </Text>
        </Box>
      );
    });

  return (
    <Container minW={"100%"} maxH={"85vh"} overflowY={"scroll"}>
      <Container
        maxW={{ base: "xl", md: "2xl", lg: "4xl", xl: "5xl", "2xl": "6xl" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={"20px"}
      >
        <VStack>
          <HStack>
            <Image
              src={
                data.image_url ||
                "https://static.wikia.nocookie.net/espokemon/images/7/77/Pikachu.png"
              }
              alt="image"
            />

            <Box>
              <Text fontSize="xl" textTransform="uppercase">
                {data.title}
              </Text>
              <Text>{data.price}</Text>
              <Text>{data.pub_address} @ proof of humanity</Text>

              <HStack mt="5">
                <Button>BUY</Button>
                <Spacer />
                <Text>
                  <Icon as={FcLike} /> 114
                </Text>
                <Text>
                  <Icon as={FcShare} /> 114
                </Text>
              </HStack>
            </Box>
          </HStack>
          <Box>
            <Text>{data.description}</Text>

            <HStack>
              <Spacer />
              <Button variant="outline">Like</Button>
              <Button variant="outline">Share</Button>
            </HStack>
          </Box>

          <VStack w="full">
            <>{comments}</>
            <CommentBox />
          </VStack>
        </VStack>
      </Container>
    </Container>
  );
};

export default Publication;
