import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    starlight({
      title: "Tim's API Documentation",
      disable404Route: true,
      sidebar: [
        {
          label: "Start here",
          // link: "/",
          items: [
            { label: "Getting started", link: "/docs" },
            { label: "Usage limits", link: "/docs/usage-limits" },
          ],
        },
      ],
    }),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  redirects: {
    "/tools/png-to-webp": "/tools/convert/image/png-to-webp",
    "/tools/jpg-to-webp": "/tools/convert/image/jpg-to-webp",
    "/tools/jpeg-to-webp": "/tools/convert/image/jpeg-to-webp",
    "/tools/webp-to-png": "/tools/convert/image/webp-to-png",
    "/tools/bin-to-hex": "/tools/convert/number/bin-to-hex",
    "/tools/hex-to-bin": "/tools/convert/number/hex-to-bin",
    "/tools/website-word-counter": "/tools/web/seo/website-word-counter",
    "/tools/random-id-generator": "/tools/coding/generator/random-id-generator",
    "/tools/js-beautifier": "/tools/coding/formatter/js-beautifier",
  },
});
