// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "netlify", // Output directory for the build
    assetsDir: "", // No subdirectory for assets
    rollupOptions: {
      input: "/src/pages/index.html", // Entry point
    },
  },
});
