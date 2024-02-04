interface ToolCategory {
  name: string;
  description: string;
  slug: string;
  sub_categories?: {
    name: string;
    description: string;
    slug: string;
  }[];
}

export const tool_categories: ToolCategory[] = [
  {
    name: "Converter",
    description: "Converter",
    slug: "convert",
    sub_categories: [
      {
        name: "Numbers",
        description: "Number Converters",
        slug: "number",
      },
      {
        name: "Images",
        description: "Image Converters",
        slug: "image",
      },
    ],
  },
  {
    name: "Web",
    description: "Web",
    slug: "web",
    sub_categories: [
      {
        name: "SEO",
        description: "SEO Tools",
        slug: "seo",
      },
    ],
  },
  {
    name: "Coding",
    description: "Coding",
    slug: "coding",
    sub_categories: [
      {
        name: "Formatter",
        description: "Formatter",
        slug: "formatter",
      },
      {
        name: "Generator",
        description: "Generator",
        slug: "generator",
      },
    ],
  },
];
