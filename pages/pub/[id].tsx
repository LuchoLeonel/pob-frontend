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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import CommentBox from "../../components/CommentBox";
import { FcLike, FcShare } from "react-icons/fc";
import ImageViewer from "../../components/ImageViewer";
import FileUpload from "../../styles/FileUpload";
import { BACKEND_URL } from "../../utils/utils";

type Props = {};

type PublicationData = {
    id: string;
    profileId: string;
    postLensId: string;
    section: string;
    title: string;
    price: string;
    image: string;
    description: string;
};

export const ConfirmModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: string;
}> = ({ isOpen, onClose, title, price }) => {
  const [loading, setIsLoading] = useState(false);

  console.log(title, price);

  const buy = () => {
    setIsLoading(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!loading}
      closeOnEsc={!loading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please, confirm...</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          {title}: By buying this article, you will be sending MATIC {price} to
          our smart contract...
          {loading && <Text>Please confirm the transaction...</Text>}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            onClick={buy}
            isLoading={loading}
            loadingText={"Loading"}
          >
            Buy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Publication: NextPage = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<PublicationData>();
  const [loading, setIsLoading] = useState(false);

  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onClose: confirmOnClose,
  } = useDisclosure();

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/post/${id}`);
        const result = await response.json();
        setData(result.data[0]);
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

          <ReactMarkdown>{e}</ReactMarkdown>
        </Box>
      );
    });

  return (
    <>
      {data && (
        <ConfirmModal
          isOpen={confirmIsOpen}
          onClose={confirmOnClose}
          title={data.title}
          price={data.price}
        />
      )}
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
                  data.image ||
                  "https://static.wikia.nocookie.net/espokemon/images/7/77/Pikachu.png"
                }
                alt="image"
                boxSize="400px"
                objectFit="contain"
              />

              <Box>
                <Text fontSize="xl" textTransform="uppercase">
                  {data.title}
                </Text>
                <Text>{data.price}</Text>
                <Text>{data.postLensId} @ proof of humanity</Text>

                <HStack mt="5">
                  <Button onClick={confirmOnOpen}>BUY</Button>
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
    </>
  );
};

export default Publication;
