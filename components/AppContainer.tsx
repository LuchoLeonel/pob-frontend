import { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import CardPost from "./CardPost/CardPost";
import GetPublications from "./GetPublications";
import {sendToIPFS} from '../api/ipfs';
import { useEffect, useState, useCallback } from 'react';

const AppContainer: NextPage = () => {

  return (
    <Container minW={"100%"} maxH={"85vh"} overflowY={"scroll"}>
      <Container
        maxW={{ base: "xl", md: "2xl", lg: "4xl", xl: "5xl", "2xl": "6xl" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <CardPost
          user={"manolo.lens"}
          image="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="Mercedes Benz 2021"
          price={25.0}
          likes={18}
          shares={12}
        />
        <CardPost
          user={"manolo.lens"}
          image="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="Mercedes Benz 2021"
          price={25.0}
          likes={18}
          shares={12}
        />{" "}
        <CardPost
          user={"manolo.lens"}
          image="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="Mercedes Benz 2021"
          price={25.0}
          likes={18}
          shares={12}
        />{" "}
        <CardPost
          user={"manolo.lens"}
          image="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="Mercedes Benz 2021"
          price={25.0}
          likes={18}
          shares={12}
        />
      </Container>
      < GetPublications />
    </Container>
  );
};

export default AppContainer;
