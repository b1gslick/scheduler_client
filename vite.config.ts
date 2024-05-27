import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  preview: {
    port: 80,
  },
  plugins: [react()],
});
