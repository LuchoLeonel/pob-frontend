import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";
import { GET_PUBLICATIONS, GET_FOLLOWING, GET_PROFILES_OWNED_BY, CREATE_POST_TYPED_DATA } from "../api/querys";
import { apolloClient } from "../api/apollo";
import { APP_ID } from "../utils/utils";

type Following = any;
type Publications = any;
type User = any;


const GetPublications = () => {
    const { address, isConnected } = useAccount()
    const [following, setFollowing] = useState(Array<Following>);
    const [publications, setPublications] = useState(Array<Publications>);
    const [user, setUser] = useState(Array<User>);

    useEffect(() => {
        const main = async () => {
          //const profiles = await getFollowing();
          //console.log(profiles);
          //await getPublications(profiles);
          let use = await getProfile();
          console.log(use[0].id);
          await createPublication(use[0].id);
        }
    
        main();
    }, []);

    const getFollowing = async () => {
        const response = await apolloClient.query({
            query: GET_FOLLOWING,
            variables: {
                request: { 
                    address: address,
                  limit: 20
                 },
            },
          });
        let profiles = response.data.following.items;
        setFollowing(profiles);
        return profiles;
    }

    const getPublications = async (following: Array<Following>) => {
      for (const follow of following) {
        const response = await apolloClient.query({
          query: GET_PUBLICATIONS,
          variables: {
            request: {
              sources: [APP_ID],
              profileId: follow.profile.id,
              publicationTypes: ["POST", "MIRROR"],
              limit: 50
            }
          },
        });
        console.log(response.data.publications.items);
      }
      return;
  }

  const getProfile = async () => {
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
      setUser(data);
      return data;
}

const createPublication = async (id) => {
    const response = await apolloClient.mutate({
      mutation: CREATE_POST_TYPED_DATA,
      variables: {
        request: {
          profileId: id,
          contentURI: "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
          collectModule: {
            "freeCollectModule": { "followerOnly": false }
        },
        referenceModule: {
            "followerOnlyReferenceModule": true
        }
        }
      },
    });

    console.log(response);
    return;
  }


    return (
      <div>
        {following.map( following => 
          <div key={following.profile.handle}>{following.profile.bio}</div>
        )}
      </div>
    )
}

export default GetPublications;