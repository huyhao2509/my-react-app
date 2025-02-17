import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/", // Để mặc định cho Vercel
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
});
