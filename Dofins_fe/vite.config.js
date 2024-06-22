import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["canvasjs-react-charts"],
  },
  server: {
    // Path to the public directory
    publicDir: "public",
  },
});
