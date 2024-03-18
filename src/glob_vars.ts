interface ToolCategory {
  name: string;
  description: string;
  slug: string;
  sub_categories: {
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
      {
        name: "Technical",
        description: "Technical Tools",
        slug: "technical",
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
      {
        name: "Calculator",
        description: "Calculator",
        slug: "calculator",
      },
      {
        name: "Converter",
        description: "Converter",
        slug: "converter",
      },
    ],
  },
];

interface Tool {
  name: string;
  description: string;
  url: string;
  popular?: boolean;
  uses?: string;
}

export const tools: Tool[] = [
  {
    name: "Website Word Counter",
    description: "Count the words on a website",
    url: "/tools/web/seo/website-word-counter",
    popular: true,
  },
  {
    name: "PNG To WEBP Converter",
    description: "Convert PNG images to WEBP",
    url: "/tools/convert/image/png-to-webp",
    popular: true,
  },
  {
    name: "JPG To WEBP Converter",
    description: "Convert JPG images to WEBP",
    url: "/tools/convert/image/jpg-to-webp",
  },
  {
    name: "JPEG To WEBP Converter",
    description: "Convert JPEG images to WEBP",
    url: "/tools/convert/image/jpeg-to-webp",
  },
  {
    name: "WEBP To PNG Converter",
    description: "Convert WEBP images to PNG",
    url: "/tools/convert/image/webp-to-png",
  },
  {
    name: "Binary To Hexadecimal Converter",
    description: "Convert Binary numbers to Hexadecimal",
    url: "/tools/convert/number/bin-to-hex",
    popular: true,
  },
  {
    name: "Hexadecimal To Binary Converter",
    description: "Convert Hexadecimal numbers to Binary",
    url: "/tools/convert/number/hex-to-bin",
  },
  {
    name: "JavaScript Beautifier",
    description: "Format and prettify your JS code",
    url: "/tools/coding/formatter/js-beautifier",
    popular: true,
  },
  {
    name: "Inodes Calculator",
    description:
      "Calculates inodes for the exercises of University Essen Duisburg",
    url: "/tools/inodes",
  },
  {
    name: "Random ID Generator",
    description: "Generate a unique and random ID",
    url: "/tools/coding/generator/random-id-generator",
  },
  {
    name: "JSON Beautifier",
    description: "Format and prettify your JSON object",
    url: "/tools/coding/formatter/json-beautifier",
  },
  {
    name: "Tailwind Grid Generator",
    description: "Generate a Tailwind CSS grid",
    url: "/tools/coding/generator/tailwind-grid-generator",
  },
  {
    name: "URL Decoder",
    description: "Decode a URL",
    url: "/tools/web/technical/url-decode",
  },
  {
    name: "URL Encoder",
    description: "Encode a URL",
    url: "/tools/web/technical/url-encode",
  },
  {
    name: "UUID Generator",
    description: "Generate one or multiple UUIDs.",
    url: "/tools/coding/generator/uuid-v4-generator",
  },
  {
    name: "Signed Binary Calculator",
    description: "Calculate the signed binary representation of a number",
    url: "/tools/coding/calculator/signed-binary-calculator",
  },
  {
    name: "String to Hex Converter",
    description: "Convert String to Hex",
    url: "/tools/coding/converter/string-to-hex",
  },
  {
    name: "Hex to String Converter",
    description: "Convert Hex to String",
    url: "/tools/coding/converter/hex-to-string",
  },
  {
    name: "UTM Tag Builder",
    description: "Build UTM tags for your URLs",
    url: "/tools/web/technical/utm-tag-builder",
  },
  {
    name: "Binary Calculator",
    description: "Add, substract, multiply and divide binary numbers",
    url: "/tools/coding/calculator/binary-calculator",
  },
];

export function buildBreadcrumb(category: string, subcategory: string) {
  // find the category and subcategory by it's slug and return the data like that: [{ name: "Tools", url: "/tools" }, { name: category, url: `/tools/categories/${category}` }, { name: subcategory, url: `/tools/browse?cat=${category}&sub=${subcategory}` }];
  let cat = tool_categories.find((c) => c.slug === category);
  let sub = cat?.sub_categories.find((s) => s.slug === subcategory);
  return [
    { name: "Tools", url: "/tools" },
    { name: cat?.name, url: `/tools/categories/${category}` },
    {
      name: sub?.name,
      url: `/tools/browse?cat=${category}&sub=${subcategory}`,
    },
  ];
}
