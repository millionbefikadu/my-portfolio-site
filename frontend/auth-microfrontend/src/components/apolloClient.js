import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Auth client to connect to the auth microservice
const authHttpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Point to the auth microservice
});

// Set up the authorization header for the auth client
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log('Auth token:', token); // Log token for debugging
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo Client for the auth service
const authClient = new ApolloClient({
  link: authLink.concat(authHttpLink),
  cache: new InMemoryCache(),
});

export { authClient };
