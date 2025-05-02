import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    federation({
      name: 'hostApp',
      remotes: {
        authMicrofrontend: 'http://localhost:5001/assets/remoteEntry.js',
        communityMicrofrontend: 'http://localhost:5002/assets/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        '@apollo/client': { singleton: true, requiredVersion: '^3.0.0' },
      }
    })
  ],
  server: {
    port: 5000,
    strictPort: true,
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
