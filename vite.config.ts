import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2015", // This ensures compatibility with older browsers
  },
  server: {
    port: 5174,
  },
});
