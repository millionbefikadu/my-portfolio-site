import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    federation({
      name: 'authMicrofrontend',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/components/Login.jsx',
        './Signup': './src/components/Signup.jsx',
        './Logout': './src/components/Logout.jsx'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        '@apollo/client': { singleton: true, requiredVersion: '^3.0.0' },
      }
    })
  ],
  server: {
    port: 5001, 
    strictPort: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});