import { NextPage } from "next";
import { Container, Link } from "@chakra-ui/react";
import CardPost from "./CardPost/CardPost";
import { useState } from "react";

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
  description: string | undefined;
  __v: number;
};

type Props = {
  posts: Publications[];
};

const AppContainer = ({ posts }: Props) => {
  const [publications, setPublications] = useState(posts);

  return (
    <Container minW={"100%"} maxH={"85vh"} overflowY={"scroll"}>
      <Container
        maxW={{ base: "xl", md: "2xl", lg: "4xl", xl: "5xl", "2xl": "6xl" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"24px"}
        paddingY={"20px"}
      >
        <>
          {publications.length > 0 &&
            publications.map((pub, i) => (
              <Link href={"/pub/" + pub._id} key={pub.postLensID + "_" + i}>
                <CardPost
                  key_={pub.postLensID}
                  profileId={pub.profileID}
                  user={pub.lensProfile}
                  image={pub.image}
                  title={pub.title}
                  price={pub.price}
                  likes={18}
                  shares={pub.mirrors}
                />
              </Link>
            ))}
        </>
      </Container>
    </Container>
  );
};

export default AppContainer;
