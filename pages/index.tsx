import type { NextPage } from "next";
import { apolloClientNoSecure } from "../api/apollo";
import { GET_PUBLICATION } from "../api/querys";

import AppContainer from "../components/AppContainer";

import Layout from "../components/Layout/Layout";
import { BACKEND_URL } from "../utils/utils";

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

const Home = ({ posts }: Props) => {
  return <AppContainer posts={posts} />;
};

export async function getServerSideProps(ctx: any) {
  const url = BACKEND_URL + `/posts`;

  const response = await fetch(url);
  const fetchData = await response.json();

  const data = fetchData.data;
  for (const d in data) {
    const publication_id = data[d].postLensID;
    var parsedPublicationId;
    if (publication_id < 10) {
      parsedPublicationId = "0x0" + publication_id;
    } else {
      parsedPublicationId = "0x" + publication_id;
    }
    const publicationId = data[d].profileID + "-" + parsedPublicationId;
    const response = await apolloClientNoSecure.query({
      query: GET_PUBLICATION,
      variables: {
        request: {
          publicationId,
        },
      },
    });

    const publicationInfo = response.data.publication;
    data[d].postLensID = publicationId;
    data[d].mirrors =
      publicationInfo?.mirrors?.length !== undefined
        ? publicationInfo?.mirrors?.length
        : 0;
    data[d].lensProfile =
      publicationInfo?.profile?.handle !== undefined
        ? publicationInfo?.profile?.handle
        : null;
  }

  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
