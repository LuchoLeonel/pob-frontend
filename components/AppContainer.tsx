import { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import CardPost from "./CardPost/CardPost";
import GetPublications from "./GetPublications";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/utils";

type Publications = any;

const AppContainer: NextPage = () => {
  const [publications, setPublications] = useState(Array<Publications>);

  useEffect(() => {
    getDatabasePosts();

    console.log(publications);
  }, []);

  const getDatabasePosts = async () => {
    const url = BACKEND_URL + "/posts";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPublications(data.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <Container minW={"100%"} maxH={"85vh"} overflowY={"scroll"}>
      <Container
        maxW={{ base: "xl", md: "2xl", lg: "4xl", xl: "5xl", "2xl": "6xl" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <>
          {publications.length > 0 &&
            publications.map((pub) => (
              <CardPost
                key={pub.postLensID}
                user={"manolo.lens"}
                image={pub.image}
                title={pub.title}
                price={pub.price}
                likes={18}
                shares={12}
              />
            ))}
        </>
      </Container>
    </Container>
  );
};

export default AppContainer;
