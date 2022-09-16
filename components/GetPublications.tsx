import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";
import { GET_PUBLICATIONS, GET_FOLLOWING, GET_PROFILES_OWNED_BY, CREATE_POST_TYPED_DATA } from "../api/querys";
import { apolloClient } from "../api/apollo";
import { APP_ID } from "../utils/utils";
import {ethers, utils} from "ethers";
import omitDeep from 'omit-deep';
import { createLensHub } from '../utils/lens-hub';


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
          //const profiles = await getFollowing();
          //console.log(profiles);
          //await getPublications(profiles);
          let use = await getProfile();
          console.log(use[0].id);
          if (!publicMade) {
            await createPublication(use[0].id);
            setPublicMade(true);
          }


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


 const signedTypeData = async (domain, types, value) => {
  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await ethersProvider.getSigner()
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(value, '__typename')
  );
}

const splitSignature = (signature) => {
  return utils.splitSignature(signature)
}

const createPublication = async (id) => {
    const response = await apolloClient.mutate({
      mutation: CREATE_POST_TYPED_DATA,
      variables: {
        request: {
          profileId: id,
          contentURI: "https://pastebin.com/raw/KT2M61VT",
          collectModule: {
            freeCollectModule: { followerOnly: false }
        },
        referenceModule: {
            followerOnlyReferenceModule: true
        }
        }
      },
    });
    const typedData = response.data.createPostTypedData.typedData;
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature);
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    
    const lensHub = createLensHub(ethersProvider);
    console.log(lensHub);
    const tx = await lensHub.postWithSig({
      profileId: typedData.value.profileId,
      contentURI:typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log(tx);
    console.log(tx.hash);
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