import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
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
