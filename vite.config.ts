import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: false, // Allow fallback if port 8080 is in use
    proxy: {
      // Proxy specific auth endpoints instead of all /auth/* routes
      "/auth/user": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/auth/providers": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/auth/logout": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      // Provider authentication endpoints
      "/auth/google": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/auth/github": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      // Account linking/unlinking endpoints
      "/auth/link": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/auth/unlink": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
