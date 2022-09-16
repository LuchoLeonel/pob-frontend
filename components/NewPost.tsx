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

    console.log(fileUrl, fileId);

    setIsLoading(false);
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
