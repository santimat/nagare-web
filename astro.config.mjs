import { defineConfig } from "astro/config";
import talwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import path from "path";
// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
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
