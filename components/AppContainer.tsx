import { NextPage } from "next";
import { Container } from "@chakra-ui/react";
import CardPost from "./CardPost/CardPost";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/utils";
import { apolloClient } from "../api/apollo";
import { GET_PUBLICATION } from '../api/querys';

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
  __v: number;
};

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
      const response2 = await response.json();
      const data = response2.data;
      for (const d in data) {
        const publication_id = data[d].postLensID;
        var parsedPublicationId;
        if (publication_id < 10) {
          parsedPublicationId = "0x0" + publication_id;
        } else {
          parsedPublicationId = "0x" + publication_id;
        }
        const publicationId = data[d].profileID + "-" + parsedPublicationId;
        const response = await getPublication(publicationId);
        const publicationInfo = response.data.publication;
        data[d].mirrors = publicationInfo?.mirrors?.length;
        data[d].description = publicationInfo?.description;
        data[d].lensProfile = publicationInfo?.profile?.handle;
      }
      setPublications(data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  const getPublication = (publicationId) => {
    return apolloClient.query({
     query: GET_PUBLICATION,
      variables: {
        request: {
          publicationId
        }
      },
   })
 }

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
            publications.map((pub, i) => (
              <CardPost
                key={pub.postLensID + "_" + i}
                user={pub.lensProfile}
                image={pub.image}
                title={pub.title}
                price={pub.price}
                likes={18}
                shares={pub.mirrors}
              />
            ))}
        </>
      </Container>
    </Container>
  );
};

export default AppContainer;
