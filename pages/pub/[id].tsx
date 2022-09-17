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
import { apolloClient, apolloClientNoSecure } from "../../api/apollo";
import { GET_PUBLICATION } from "../../api/querys";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { client } from "@wagmi/core/dist/declarations/src/client";
import { gql } from "@apollo/client";

type Props = {
  post: Publications;
};

type Publications = {
  postLensID: string;
  profileID: string;
  section: string;
  image: string;
  price: number;
  lensProfile: string;
  mirrors: number;
  _id: string;
  title: string;
  description: string | null;
  __v: number;
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

const Publication = ({ post }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(post);

  //const [data, setData] = useState<PublicationData>();
  const [loading, setIsLoading] = useState(false);

  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onClose: confirmOnClose,
  } = useDisclosure();

  if (!post)
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
      {post && (
        <ConfirmModal
          isOpen={confirmIsOpen}
          onClose={confirmOnClose}
          title={post.title}
          price={post.price.toString()}
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
                  post.image ||
                  "https://static.wikia.nocookie.net/espokemon/images/7/77/Pikachu.png"
                }
                alt="image"
                boxSize="400px"
                objectFit="contain"
              />

              <Box>
                <Text fontSize="xl" textTransform="uppercase">
                  {post.title}
                </Text>
                <Text>{post.price}</Text>
                <Text>{post.postLensID} @ proof of humanity</Text>

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
              <Text>
                {post.description !== undefined ? post.description : null}
              </Text>

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

export async function getStaticPaths() {
  const url = BACKEND_URL + "/posts";
  const response = await fetch(url);
  const data = await response.json();

  const paths = data.data.map(
    (post: {
      profileID: string;
      postLensID: number;
      section: string;
      title: string;
      price: number;
      image: string;
      _id: string;
      __v: number;
    }) => {
      return { params: { id: post._id } };
    }
  );
  return {
    paths,
    fallback: true,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }: { params: any }) {
  const url = BACKEND_URL + `/post/${params.id}`;

  const getPublication = async (publicationId: string) => {
    return await apolloClientNoSecure.query({
      query: GET_PUBLICATION,
      variables: {
        request: {
          publicationId,
        },
      },
    });
  };

  const response = await fetch(url);
  const response2 = await response.json();
  const data = response2.data[0];

  const publication_id = data.postLensID;
  var parsedPublicationId;
  if (publication_id < 10) {
    parsedPublicationId = "0x0" + publication_id;
  } else {
    parsedPublicationId = "0x" + publication_id;
  }
  const publicationId = data.profileID + "-" + parsedPublicationId;
  const responseGraphQL = await getPublication(publicationId);
  const publicationInfo = responseGraphQL.data.publication;
  data.mirrors = publicationInfo?.mirrors?.length;
  data.description =
    publicationInfo?.description !== undefined
      ? publicationInfo?.description
      : null;
  data.lensProfile = publicationInfo?.profile?.handle;

  console.log(data);

  return {
    props: { post: data },
  };
}

/**
export async function getServerSideProps(ctx: any) {
  const url = BACKEND_URL + `/posts`;
  console.log(url);

  const response = await fetch(url);
  const fetchData = await response.json();
  console.log(ctx.params.id);

  const data = fetchData.data.filter(
    (backPost: {
      profileID: string;
      postLensID: number;
      section: string;
      title: string;
      price: number;
      image: string;
      _id: string;
      __v: number;
    }) => {
      return backPost._id === ctx.params.id;
    }
  )[0];

  const getPublication = async (publicationId: string) => {
    return await apolloClient.query({
      query: gql(GET_PUBLICATION),
      variables: {
        request: {
          publicationId,
        },
      },
    });
  };

  const publication_id = data.postLensID;
  var parsedPublicationId;
  if (publication_id < 10) {
    parsedPublicationId = "0x0" + publication_id;
  } else {
    parsedPublicationId = "0x" + publication_id;
  }
  const publicationId = data.profileID + "-" + parsedPublicationId;
  const responseGraphQL = await getPublication(publicationId);
  console.log(responseGraphQL);
  /**
  console.log(responseGraphQL);
  const publicationInfo = responseGraphQL.data.publication;
  data.mirrors = publicationInfo?.mirrors?.length;
  data.description = publicationInfo?.description;
  data.lensProfile = publicationInfo?.profile?.handle;
 
  console.log(data);
  return {
    props: {
      post: "page" || null,
    },
  };
}
*/

export default Publication;
