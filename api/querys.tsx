import { gql } from '@apollo/client';

export const GET_CHALLENGE = gql`
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`
export const AUTHENTICATION = gql`
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

export const VERIFY = gql`
  query($request: VerifyRequest!) {
  verify(request: $request)
  }
`

export const REFRESH_AUTHENTICATION = gql`
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`

export const GETPROFILEBYID = gql`
  query ($request: ProfileRequest!) {
    profile(request: $request) {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
          type
        }
        ... on RevertFollowModuleSettings {
          type
        }
      }
    }
  }
`

export const CREATEPOSTTYPEDDATA = gql`
  mutation($request: CreatePostTypedDataRequest!)  {
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`

export const CREATECOMMENTTYPEDDATA = gql`
  mutation($request: CreateCommentTypedDataRequest!)  {
    createCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          profileIdPointed
          pubIdPointed
          contentURI
          referenceModuleData
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`

export const CREATEMIRRORTYPEDDATA = gql`
  mutation($request: CreateMirrorTypedDataRequest!)  {
    createMirrorTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          MirrorWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          profileIdPointed
          pubIdPointed
          referenceModule
          referenceModuleData
          referenceModuleInitData
        }
      }
    }
  }
`