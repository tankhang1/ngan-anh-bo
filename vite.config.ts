import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  build: {
    chunkSizeWarningLimit: 60000,
  },
  optimizeDeps: {
    exclude: [
      "@fullcalendar/core",
      "@fullcalendar/core/index.js",
      "@fullcalendar/core/internal.js",
      "gridjs",
    ],
  },
});
