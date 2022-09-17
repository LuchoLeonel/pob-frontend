import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  HStack,
  useNumberInput,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Upload } from "upload-js";
import FileUpload from "./FileUpload";
import ImageViewer from "./ImageViewer";
import {BACKEND_URL, checkStorage} from '../utils/utils'; 
import { GET_PROFILES_OWNED_BY, CREATE_POST_TYPED_DATA, GET_PUBLICATIONS } from "../api/querys";
import { apolloClient } from "../api/apollo";
import { useAccount } from 'wagmi'
import {ethers, utils} from "ethers";
//@ts-ignore
import omitDeep from 'omit-deep';
import { createLensHub } from '../utils/lens-hub';
import {sendMetadataToIpfs} from '../api/ipfs';


declare var window: any;


const PriceStepper: FC<{
  onChange: (value: number) => void;
}> = ({ onChange }) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.01,
      defaultValue: 0.01,
      min: 0.01,
      precision: 2,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const { value: v, ...input } = getInputProps();

  useEffect(() => {
    onChange(v);
  }, [v]);

  return (
    <HStack maxW="320px">
      <Button colorScheme="pink" {...dec}>-</Button>
      <Input {...{ ...input, value: "MATIC " + v }} />
      <Button colorScheme="pink" {...inc}>+</Button>
    </HStack>
  );
};

export const NewPostModal: FC<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}> = ({ isOpen, onOpen, onClose }) => {
  const { address, isConnected } = useAccount()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.01);
  const [files, setFiles] = useState<File[]>([]);

  const [valid, setValid] = useState(false);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setValid(title !== "" && description !== "" && files.length > 0);
  }, [title, description, files]);

  const create = async () => {
    setIsLoading(true);

    const upload = new Upload({
      apiKey: "free"
    });

    const { fileUrl, fileId } = await upload.uploadFile({
      file: files[0]
    });
    

    const user = await getProfile();
    if (!user) { return }

    const publicationId = await createPublication(user, description);

    const url = BACKEND_URL + "/post";
    const options = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title.toString(),
        price,
        image: fileUrl,
        profileID: user,
        postLensID: publicationId,
        section: "Automoviles",
        description
      }),
    }

    const response = await fetch(url, options);


    setIsLoading(false);
  };

  const getProfile = async () => {
    if (!isConnected || !checkStorage()) { return }
    const response = await apolloClient.query({
        query: GET_PROFILES_OWNED_BY,
        variables: {
            request:{ 
                ownedBy: address,
                limit: 1,
            }
        },
      });
      let data = response.data.profiles.items;
      if (data.length == 0) { return };
      return data[0]?.id;
  }


 const signedTypeData = async (domain, types, value) => {
  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await ethersProvider.getSigner()
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(value, '__typename')
  );
}

const splitSignature = (signature) => {
  return utils.splitSignature(signature)
}

const createPublication = async (id, description) => {

    const ipfsUrl = await sendMetadataToIpfs(description);

    const response = await apolloClient.mutate({
      mutation: CREATE_POST_TYPED_DATA,
      variables: {
        request: {
          profileId: id,
          contentURI: ipfsUrl,
          collectModule: {
            freeCollectModule: { followerOnly: false }
        },
        referenceModule: {
            followerOnlyReferenceModule: true
        }
        }
      },
    });

    console.log(response)
    const typedData = response.data.createPostTypedData.typedData;
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature);
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    
    const lensHub = createLensHub(ethersProvider);
    const tx = await lensHub.postWithSig({
      profileId: typedData.value.profileId,
      contentURI:typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });

    const rc = await tx.wait(); // 0ms, as tx is already confirmed
  
    const otro = await lensHub.getPubCount(id);
    return parseInt(otro._hex);
  }
/*
  const getPublicationsLenght = async (id) => {
      const response = await apolloClient.query({
        query: GET_PUBLICATIONS,
        variables: {
          request: {
            profileId: id,
            publicationTypes: ["POST", "COMMENT","MIRROR"],
            limit: 10
          }
        },
      });

    const length = response.data.publications.items.length;
    return length;
}*/

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!loading}
      closeOnEsc={!loading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new publication!</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <FormControl mt="5" isDisabled={loading}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Teddy bear"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mt="5" isDisabled={loading}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Awesome teddy bear"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl mt="5" isDisabled={loading}>
            <FormLabel>Price</FormLabel>
            <PriceStepper onChange={setPrice} />
          </FormControl>

          <FormControl mt="5" isDisabled={loading}>
            <FormLabel>
              Please select an image for your product
            </FormLabel>
            {files.length === 0 ? (
              <FileUpload onSelect={setFiles} />
            ) : (
              <ImageViewer
                file={files[0]}
                remove={() => setFiles([])}
                disabled={loading}
              />
            )}
          </FormControl>

          {loading && <Text>Please confirm the transaction...</Text>}
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={create}
            isDisabled={!valid}
            isLoading={loading}
            loadingText={"Loading"}
            colorScheme="pink"
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewPostModal;
