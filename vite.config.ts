import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  preview: {
    port: 80,
  },
  define: {
    "process.env": {},
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          (process.env.PROXY_BACKEND_ROUTE as string) ??
          "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
