/// <reference types="astro/client" />

declare module "*.svg" {
  import type { ComponentProps, JSX } from "astro/types";
  const content: (props: ComponentProps<'svg'>) => JSX.Element;
  export default content;
}