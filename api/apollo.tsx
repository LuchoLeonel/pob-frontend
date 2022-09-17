import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { clearStorage } from "../utils/utils";
import { GET_PROFILES_OWNED_BY } from "../api/querys";

const API_URL = "https://api-mumbai.lens.dev";

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken || accessToken === "undefined") {
    clearStorage();
    return;
  }

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: API_URL,
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const apolloClientNoSecure = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
