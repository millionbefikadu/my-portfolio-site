import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import { authClient, communityClient } from '../../host-app/src/apolloClients'; // Correct relative path



ReactDOM.render(
  <ApolloProvider client={authClient}> {/* Use the authClient here */}
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
