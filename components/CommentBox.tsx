import { Button, Textarea, VStack } from "@chakra-ui/react";
import { FC } from "react";

export const CommentBox: FC = ({}) => {
  return (
    <VStack align="end" w="full">
      <Textarea placeholder="**Loved it!**" />

      <Button>Comment</Button>
    </VStack>
  );
};

export default CommentBox;
