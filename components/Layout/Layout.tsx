import { Box, Flex, Heading, HStack, Spacer, Show } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextComponentType } from "next";
import ThemeSwitcher from "../ThemeSwitcher";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Flex flexDirection={"row"} justifyContent={"stretch"} height={"100%"}>
        <Flex
          display={{ base: "none", md: "none", lg: "flex" }}
          width={"300px"}
          height={"100vh"}
          paddingLeft={"40px"}
          paddingTop={"24px"}
        >
          <Heading>Logo</Heading>
        </Flex>
        <Flex flexDirection={"column"} width={"100%"} height={"100%"}>
          <Flex
            alignItems="center"
            justifyContent={"space-between"}
            width={{ base: "100%", md: "100%", lg: "auto" }}
            height={"90px"}
            paddingLeft={{ base: "20px", md: "20px", lg: "40px" }}
            paddingRight={{ base: "10px", md: "10px", lg: "40px" }}
            alignSelf={"flex-end"}
            gap="2"
          >
            <Heading display={{ base: "block", md: "block", lg: "none" }}>
              Logo
            </Heading>
            <Box>
              <HStack m={4} spacing={4}>
                <Spacer />
                <ConnectButton />
                <ThemeSwitcher />
              </HStack>
            </Box>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
