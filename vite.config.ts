import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Mặc định cho Vercel
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 5000,
    open: true,
  },
  // Fix lỗi 404 khi reload trên route con
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
