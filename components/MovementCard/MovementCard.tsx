import { CheckIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Matic from "../Icons/Matic";

type Props = {
  image: string;
  actualButtonState: buttonState;
  title: string;
  seller: string;
  sellerProfile: string;
  price: number;
  recived: boolean;
};

type buttonState = {
  disabled: boolean;
  loading: boolean;
};

const MovementCard = ({
  image,
  actualButtonState,
  title,
  seller,
  sellerProfile,
  price,
  recived,
}: Props) => {
  const initialButtonState: buttonState = {
    disabled: false,
    loading: false,
  };

  const backgroundColor = useColorModeValue("#bfcbc2", "#2c302e");
  const lensHandleColor = useColorModeValue("#537a5a", "#9ae19d");
  const witheBlack = useColorModeValue("black", "white");
  const [buttonState, setButtonState] = useState(initialButtonState);

  const handleClickButton = () => {
    setButtonState({ ...buttonState, loading: true });
    setTimeout(() => {
      setButtonState({ loading: false, disabled: true });
    }, 7000);
  };

  useEffect(() => {
    setButtonState(actualButtonState);
  }, []);

  return (
    <Flex
      w={"100%"}
      h={"250px"}
      justifyContent={"space-around"}
      alignItems={"center"}
      backgroundColor={backgroundColor}
      borderRadius={"4px"}
      boxShadow={"3px 3px 10px 0px rgba(0,0,0,0.71);"}
      marginY={"30px"}
    >
      <Flex flexDirection={"column"} w={"15%"}>
        <Text as={"b"}>{title}</Text>
        <Text>
          Seller:{" "}
          <Link href={`/${sellerProfile}`}>
            <Text as={"b"}>{seller}</Text>
          </Link>
        </Text>
        <Flex flexDirection={"row"} w={"100%"} gap={2}>
          <Text>Price: </Text>
          <Matic w={4} h={4} />
          <Text as={"b"}>{price}</Text>
        </Flex>
      </Flex>
      <Image
        boxSize={{ base: "32", lg: "56" }}
        objectFit={"cover"}
        alt="example"
        src={image}
      />
      <Button>Contact Seller</Button>
      <Button
        isLoading={buttonState.loading}
        disabled={buttonState.disabled}
        rightIcon={recived ? <CheckIcon /> : <DownloadIcon />}
        colorScheme="brand"
        onClick={handleClickButton}
      >
        {recived ? "Recived" : "Withdraw"}
      </Button>
    </Flex>
  );
};

export default MovementCard;
