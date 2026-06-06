import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Stocktake - Vite config.
// `@` aliases src/ so the `shadcn/ui` import style works as written
// (`@/components/ui/button`, `@/lib/utils`, ...).

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
