import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per product in src/content/products. Body = the "More details" text.
const products = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      summary: z.string(),
      image: image(),
      imageAlt: z.string(),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { products };
