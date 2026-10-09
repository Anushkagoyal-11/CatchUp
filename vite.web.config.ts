import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// This config builds the standalone web dashboard for Netlify/Vercel
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-web',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  }
});
