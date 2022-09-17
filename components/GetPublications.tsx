import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";
import { GET_PUBLICATIONS, GET_FOLLOWING, GET_PROFILES_OWNED_BY, CREATE_POST_TYPED_DATA } from "../api/querys";
import { apolloClient } from "../api/apollo";
import { APP_ID } from "../utils/utils";
import {ethers, utils} from "ethers";
//@ts-ignore
import omitDeep from 'omit-deep';
import { createLensHub } from '../utils/lens-hub';
import {sendToIPFS} from '../api/ipfs';


type Following = any;
type Publications = any;
type User = any;
declare var window: any;

const GetPublications = () => {
    const { address, isConnected } = useAccount()
    const [following, setFollowing] = useState(Array<Following>);
    const [publications, setPublications] = useState(Array<Publications>);
    const [user, setUser] = useState(Array<User>);
    const [publicMade, setPublicMade] = useState(false);

    useEffect(() => {
        const main = async () => {
          const profiles = await getFollowing();
          console.log(profiles);
          await getPublications(profiles[0].profile.id);
          let use = await getProfile();
          console.log(use[0].id);
          /*if (!publicMade) {
            
            setPublicMade(true);
          }*/


          await getPublications(use[0].id);
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

    const getPublications = async (id) => {
      //for (const follow of following) {
        const response = await apolloClient.query({
          query: GET_PUBLICATIONS,
          variables: {
            request: {
              profileId: id,
              publicationTypes: ["POST", "COMMENT","MIRROR"],
              limit: 10
            }
          },
        });
        console.log(response.data.publications.items);
      //}
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