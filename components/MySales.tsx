import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";
import { GET_PUBLICATIONS, GET_DEFAULT_PROFILE, CREATE_PROFILE, GET_PROFILES_OWNED_BY,
    CREATE_SET_DEFAULT_PROFILE_TYPED_DATA} from "../api/querys";
import { apolloClient } from "../api/apollo";
import { APP_ID } from "../utils/utils";

type Following = any;
type User = any;

const MySales = () => {
    const { address, isConnected } = useAccount()
    const [user, setUser] = useState(Array<User>);

    const createProfile = async () => {
        const response = await apolloClient.mutate({
            mutation: CREATE_PROFILE,
            variables: {
                request:{ 
                    handle: "lucholeonelll",
                    profilePictureUri: null,
                    followNFTURI: null,
                    followModule: {
                        freeFollowModule: true
                     }
                }
            },
          });

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
/*
    const createDefaultProfile = async () => {
        const response = await apolloClient.mutate({
            mutation: CREATE_SET_DEFAULT_PROFILE_TYPED_DATA,
            variables: {
              request: {
                profileId: "0x46b9",
              }
            },
          });
          console.log(response);
    }

    const getDefaultProfile = async () => {
        const response = await apolloClient.query({
            query: GET_DEFAULT_PROFILE,
            variables: {
              request: {
                ethereumAddress: address,
              }
            },
          });

          console.log(response);
    }

*/
    useEffect(() => {
        const main = async () => {
          let response = await getProfile();
        console.log(response);
            
        }
    
        main();
    }, [createProfile]);
    




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

    return (
      <div>
 
      </div>
    )
}

export default MySales;