import { RepeatClockIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Matic from "../Icons/Matic";
import { apolloClient } from "../../api/apollo";
import { CREATE_MIRROR_TYPED_DATA } from "../../api/querys";
import { useAccount } from 'wagmi'


type Props = {
  key_: string,
  profileId: string,
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
  key_,
  profileId,
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
  const { address, isConnected } = useAccount()
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  const backgroundColor = useColorModeValue("#bfcbc2", "#2c302e");
  const lensHandleColor = useColorModeValue("#537a5a", "#9ae19d");
  const witheBlack = useColorModeValue("black", "white");

  useEffect(() => {
    if (newLiked) {
      setLiked(newLiked);
    }
    if (newShared) {
      setShared(newShared);
    }
    
  }, []);

  const Mirror = async () => {
    if (!shared && isConnected) {
      console.log(key_);
        let response = await apolloClient.mutate({
         mutation: CREATE_MIRROR_TYPED_DATA,
         variables: {
           request: {
            profileId: profileId,
            publicationId: key_,
            referenceModule: {
                followerOnlyReferenceModule: true
            }
         },
         },
       })
       console.log(response);
    }
    setShared(!shared)
  }
  
  return (
    <Box
      width={{ base: "4xs", md: "xl", lg: "2xl", xl: "3xl" }}
      backgroundColor={backgroundColor}
      paddingY={"40px"}
      paddingX={{ base: "20px", md: "0px", lg: "20px" }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      borderRadius={"2%"}
      boxShadow={"3px 3px 16px 0px rgba(0,0,0,0.71);"}
    >
      <Flex
        alignItems={"center"}
        alignSelf={"flex-start"}
        paddingLeft={"20px"}
        gap={"10px"}
        marginBottom={"16px"}
        cursor={"pointer"}
      >
        <Image
          boxSize={{ base: "10" }}
          borderRadius={"100%"}
          objectFit={"contain"}
          alt="example"
          src={image}
        />
        <Text color={lensHandleColor}>{user}</Text>
      </Flex>

      <Image
        boxSize={{ base: "2xs", md: "lg" }}
        objectFit={"cover"}
        alt="example"
        src={image}
        cursor="pointer"
        filter="auto"
        transition={"ease-in-out 0.25s"}
        _hover={{ brightness: "60%" }}
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
            borderColor={liked ? lensHandleColor : "transparent"}
            paddingY={"8px"}
            paddingX={"12px"}
            color={liked ? lensHandleColor : witheBlack}
            _hover={{ color: lensHandleColor, borderColor: lensHandleColor }}
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
            color={shared ? "pink" : witheBlack}
            _hover={{ color: "pink", borderColor: "pink" }}
            cursor={"pointer"}
            onClick={() => Mirror()}
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
