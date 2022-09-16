import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Matic from "../Icons/Matic";

type Props = {
  image: string;
  title: string;
  price: number;
  likes: number;
  shares: number;
  link?: string;
};

const CardPost = ({ image, title, price, likes, shares, link }: Props) => {
  return (
    <Box
      width={{ base: "4xs", md: "xl", lg: "2xl", xl: "3xl" }}
      backgroundColor={"grey"}
      paddingY={"40px"}
      paddingX={{ base: "20px", md: "0px", lg: "20px" }}
      border={"1px solid black"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Image
        boxSize={{ base: "2xs", md: "xl", xl: "2xl" }}
        objectFit={"cover"}
        alt="example"
        src={image}
      />
      <Flex
        justifyContent={"space-between"}
        width={"100%"}
        padding={{ base: "10px", md: "40px" }}
      >
        <Text as={"b"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
          {title}
        </Text>
        <Flex
          w={{ base: "20%", md: "12%", lg: "14%" }}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Matic />
          <Text as={"b"} fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
            {price}
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        width={"100%"}
        padding={{ base: "10px", md: "40px" }}
      >
        <Flex alignItems={"baseline"} gap={"10px"}>
          <Text>{likes}</Text>
          <Button>Like</Button>
        </Flex>
        <Flex alignItems={"baseline"} gap={"10px"}>
          <Text>{shares}</Text>
          <Button>Share</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CardPost;
