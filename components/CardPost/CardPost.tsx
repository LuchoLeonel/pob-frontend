import { RepeatClockIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Matic from "../Icons/Matic";

type Props = {
  user: string;
  image: string;
  title: string;
  price: number;
  likes: number;
  shares: number;
  link?: string;
  newLiked?: boolean;
  newShared?: boolean;
};

const CardPost = ({
  user,
  image,
  title,
  price,
  likes,
  shares,
  link,
  newLiked,
  newShared,
}: Props) => {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (newLiked) {
      setLiked(newLiked);
    }
    if (newShared) {
      setShared(newShared);
    }
  }, []);

  return (
    <Box
      width={{ base: "4xs", md: "xl", lg: "2xl", xl: "3xl" }}
      backgroundColor={"#2c302e"}
      paddingY={"40px"}
      paddingX={{ base: "20px", md: "0px", lg: "20px" }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      borderBottom={"1px solid #909590"}
    >
      <Flex
        alignItems={"center"}
        alignSelf={"flex-start"}
        paddingLeft={"20px"}
        gap={"10px"}
        marginBottom={"16px"}
      >
        <Image
          boxSize={{ base: "10" }}
          borderRadius={"100%"}
          objectFit={"cover"}
          alt="example"
          src={image}
        />
        <Text color={"teal.500"}>{user}</Text>
      </Flex>

      <Image
        boxSize={{ base: "2xs", md: "lg" }}
        objectFit={"cover"}
        alt="example"
        src={image}
      />
      <Flex
        justifyContent={"space-between"}
        width={"100%"}
        padding={{ base: "10px", md: "20px" }}
      >
        <Text as={"b"} fontSize={{ base: "xl", md: "2xl" }}>
          {title}
        </Text>
        <Flex
          w={{ base: "20%", md: "12%", lg: "14%" }}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Matic />
          <Text as={"b"} fontSize={{ base: "xl", md: "2xl" }}>
            {price}
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        width={"100%"}
        padding={{ base: "10px", md: "10px" }}
      >
        <Flex alignItems={"baseline"} gap={"10px"}>
          <Text>{likes}</Text>
          <Box
            borderRadius={"100%"}
            border={"1px solid"}
            borderColor={liked ? "gold" : "transparent"}
            paddingY={"8px"}
            paddingX={"12px"}
            color={liked ? "gold" : "black"}
            _hover={{ color: "gold", borderColor: "gold" }}
            cursor={"pointer"}
            onClick={() => setLiked(!liked)}
            transition={"ease-in-out 0.25s"}
          >
            <StarIcon w={4} h={4} marginBottom={"3px"} />
          </Box>
        </Flex>
        <Flex alignItems={"baseline"} gap={"10px"}>
          <Text>{shares}</Text>
          <Box
            borderRadius={"100%"}
            border={"1px solid"}
            borderColor={shared ? "pink" : "transparent"}
            paddingY={"8px"}
            paddingX={"12px"}
            color={shared ? "pink" : "black"}
            _hover={{ color: "pink", borderColor: "pink" }}
            cursor={"pointer"}
            onClick={() => setShared(!shared)}
            transition={"ease-in-out 0.25s"}
          >
            <RepeatClockIcon w={4} h={4} marginBottom={"3px"} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CardPost;
