import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["lottie-react"],
  },
  resolve: {
    // Ensure Vite always prefers the ESM build of lottie-react
    mainFields: ["module", "browser", "main"],
  },
});
