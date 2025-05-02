import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import './App.css'; // Also import global styles here for consistent theming


import { communityClient } from './apolloClients'; // ✅ Use the correct client

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ApolloProvider client={communityClient}> {/* Use only communityClient here */}
    <App />
  </ApolloProvider>
);
