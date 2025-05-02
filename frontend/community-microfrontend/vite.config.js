import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'communityMicrofrontend',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
        './CommunityPosts': './src/components/CommunityPosts.jsx',
        './CreatePost': './src/components/CreatePost.jsx',
        './HelpRequests': './src/components/HelpRequests.jsx',
        './CreateHelpRequest': './src/components/CreateHelpRequest.jsx',
        './AIChatbot': './src/components/AIChatbot.jsx' // ✅ ADD THIS LINE
      },
      shared: ['react', 'react-dom', '@apollo/client']
    })
  ],
  server: {
    port: 5002,
    strictPort: true,
  },
  preview: {
    port: 5002,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
