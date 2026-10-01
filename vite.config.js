import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        dlrc: "dlrc.html",
        factions: "factions.html",
        mechanisms: "mechanisms.html",
        roles: "roles.html",
      },
    },
  },
});
