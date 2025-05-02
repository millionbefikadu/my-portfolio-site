import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";

// 🔗 Create HTTP Link for community microservice
const httpLink = createHttpLink({
  uri: "http://localhost:4001/graphql",
});

// 🔐 Attach auth token from localStorage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 🔄 Combine auth and HTTP links
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// 🧠 Render the app and pass communityClient to App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App communityClient={client} />
  </ApolloProvider>
);
