import { defineConfig } from "astro/config";
import talwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [talwindcss()],
  },
});
