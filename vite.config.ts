import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // Giữ nguyên cho Vercel
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Đảm bảo alias hoạt động đúng
    },
  },
});
