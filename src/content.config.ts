import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // URL pública bajo /images/blog (la sube el CMS o viene de la migración).
    cover: z.string().optional(),
    categoria: z.string().default("Mirada Fi"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
