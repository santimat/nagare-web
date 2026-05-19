import { defineConfig, fontProviders } from "astro/config";
import talwindcss from "@tailwindcss/vite";
import path from "path";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://nagarestudio.site",
  adapter: vercel(),
  output: "server",

  fonts: [
    {
      provider: fontProviders.local(),
      name: "SS-text",
      cssVariable: "--font-text",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/SourceSerif4.woff2"],
            weight: "400",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "ED-heading",
      cssVariable: "--font-heading",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/EtherealDemo-Black.woff2"],
            weight: "400",
            style: "normal",
          },
        ],
      },
    },
  ],

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

  integrations: [react()],
});