import { apolloClient } from "./apollo";
import { VERIFY, REFRESH_AUTHENTICATION } from "./querys";

export const checkStorage = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
        clearStorage();
        return false;
    }

    if (! await verifyAccessToken()) {
        if (! await refreshAccessToken()) {
            clearStorage();
            return false;
        }
    }
    return true;
}

export const clearStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export const verifyAccessToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const verify = await apolloClient.query({
        query: VERIFY,
        variables: {
          request: {
             accessToken,
          },
        },
      })

    return verify.data.verify;
}

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const refreshed = await apolloClient.mutate({
      mutation: REFRESH_AUTHENTICATION,
      variables: {
        request: {
          refreshToken,
        },
      },
    })

    if (!refreshed?.data?.refresh) {
        return false
    };

    localStorage.setItem("accessToken", refreshed.data.refresh.accessToken);
    localStorage.setItem("refreshToken", refreshed.data.refresh.refreshToken);
    return true;
  }