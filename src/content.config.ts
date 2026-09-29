import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Both language collections share the same frontmatter, so the schema is
 * defined once. They stay separate collections because Astro's glob loader
 * keys entries by directory, and each language has its own content files.
 */
const postSchema = ({ image }: { image: () => z.ZodType }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    youtubeID: z
      .string()
      .regex(/^[A-Za-z0-9_-]{11}$/, 'Must be a valid 11-character YouTube ID')
      .optional(),
    youtubeTitle: z.string().optional(),
    featured: z.boolean().optional(),
    featuredOrder: z.number().optional(),

    // Production facts. They used to live inside `description` as a trailing
    // "(Team of 4, 24 weeks)", which could not be laid out as a fact sheet.
    // All optional so a half-migrated entry still builds. There is no `year`:
    // it is derived from `pubDate`, and two copies would drift apart.
    genre: z.string().optional(),
    /** Drives the 2D/3D badge. Explicit rather than read from `tags`, which mix platforms, input and genre. */
    dimension: z.enum(['2D', '3D']).optional(),
    engine: z.string().optional(),
    role: z.array(z.string()).optional(),
    team: z.string().optional(),
    duration: z.string().optional(),
    platforms: z.array(z.string()).optional(),
    /**
     * Short muted clip played on card hover, as a path under `public/`.
     * Explicit rather than guessed by convention: a guessed path that does not
     * exist is a silent 404 on every hover.
     */
    videoPreview: z.string().optional(),
  });

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: postSchema,
});

const es = defineCollection({
  loader: glob({ base: './src/content/es', pattern: '**/*.{md,mdx}' }),
  schema: postSchema,
});

export const collections = { blog, es };
