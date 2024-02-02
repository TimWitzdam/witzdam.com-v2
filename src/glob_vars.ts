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
    name: "Converters",
    description: "Converters",
    slug: "converters",
    sub_categories: [
      {
        name: "Numbers",
        description: "Number Converters",
        slug: "number-converters",
      },
      {
        name: "Images",
        description: "Image Converters",
        slug: "image-converters",
      },
    ],
  },
];
