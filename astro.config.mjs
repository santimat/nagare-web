import { defineConfig } from "astro/config";
import path from "path";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://nagarestudio.site",
  adapter: vercel(),
  output: "server",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
