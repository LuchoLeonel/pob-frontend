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