import { defineConfig } from "astro/config";
import talwindcss from "@tailwindcss/vite";
import path from "path";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [talwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "@icons": path.resolve("./src/icons"),
        "@components": path.resolve("./src/components"),
        "@assets": path.resolve("./src/assets"),
        "@styles": path.resolve("./src/styles"),
      },
    },
  },
});
