import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Em desenvolvimento (npm run dev) o /api vai para o backend local
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7020",
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
