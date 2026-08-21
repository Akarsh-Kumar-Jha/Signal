import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'https://signal-backend-gylj.onrender.com',
        changeOrigin: true,
      },
      '/analyze': {
        target: 'https://signal-backend-gylj.onrender.com',
        changeOrigin: true,
      },
      '/health': {
        target: 'https://signal-backend-gylj.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
