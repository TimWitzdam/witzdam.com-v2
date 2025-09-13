import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    expressiveCode(),
    mdx(),
    tailwind(),
    react(),
    starlight({
      title: "Tim's Docs",
      disable404Route: true,
      favicon: "/images/pfp.ico",
      sidebar: [
        {
          label: "Welcome",
          items: [
            {
              label: "Getting started",
              link: "/docs",
            },
          ],
        },
        {
          label: "GitSave",
          items: [
            {
              label: "How to restore backups",
              link: "/docs/gitsave/how-to-restore-backups",
            },
            {
              label: "How to create a GitHub access token",
              link: "/docs/gitsave/how-to-create-a-github-access-token",
            },
            {
              label: "How to disable authentication",
              link: "/docs/gitsave/how-to-disable-authentication",
            },
            {
              label: "How to update",
              link: "/docs/gitsave/how-to-update",
            },
            {
              label: "How to set up SMB share",
              link: "/docs/gitsave/how-to-set-up-smb-share",
            },
          ],
        },
      ],
    }),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
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
    "/tools/inodes": "/tools/uni/inodes",
  },
});
