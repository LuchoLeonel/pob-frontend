/* eslint-disable no-unused-vars */
import { AiFillCloseCircle } from "react-icons/ai";
import { FC } from "react";

import { Box, Button, Image, VStack, useStyleConfig } from "@chakra-ui/react";

import { HEIGHT_PX, WIDTH_PX } from "../utils/utils";

const ImageOptions: FC<{
  remove: () => void;
}> = ({ remove }) => {
  const styles = useStyleConfig("ImageOptions", {
    variant: "default",
  });

  return (
    <VStack __css={styles}>
      <Button
        leftIcon={<AiFillCloseCircle />}
        my="10px !important"
        w="70%"
        onClick={remove}
      >
        Remove
      </Button>
    </VStack>
  );
};

export interface ImageViewerProps {
  file: File;
  disabled: boolean;
  remove: () => void;
}

export const ImageViewer: FC<ImageViewerProps> = ({ file, disabled, remove }) => {
  return (
    <Box h={HEIGHT_PX} pos="relative" w={WIDTH_PX}>
      <Image pos="absolute" src={URL.createObjectURL(file)} />

      {!disabled && <ImageOptions remove={remove} />}
    </Box>
  );
};

export default ImageViewer;
