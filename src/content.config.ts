import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";

function parseDate(str: string) {
  const parts = str.match(/(\d+)/g);

  if (!parts || parts.length !== 3) {
    throw new Error("Invalid date string format. Expected DD MM YYYY");
  }

  return new Date(
    parseInt(parts[2]), // year
    parseInt(parts[1]) - 1, // month (0-based)
    parseInt(parts[0]) // day
  );
}

export const collections = {
  docs: defineCollection({
    schema: docsSchema(),
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./docs",
    }),
  }),
  blog: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./blog",
    }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.string().transform((str) => {
        return parseDate(str);
      }),
      updated: z
        .string()
        .optional()
        .transform((str) => {
          if (!str) {
            return null;
          }

          return parseDate(str);
        }),
      image: z.string().optional(),
      tags: z.array(z.string()),
    }),
  }),
};
