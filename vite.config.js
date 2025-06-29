import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Sistem-Manajemen-Akademik/", // Nama repository GitHub Anda
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
