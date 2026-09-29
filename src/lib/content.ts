import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

export async function getBlogPosts() {
  const slugs = await reader.collections.blog.list();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.blog.read(slug);
      return entry ? { slug, ...entry } : null;
    }),
  );
  return posts
    .filter(Boolean)
    .sort((a, b) => (b!.publishedAt || "").localeCompare(a!.publishedAt || "")) as NonNullable<
    (typeof posts)[number]
  >[];
}

export async function getBlogPost(slug: string) {
  const entry = await reader.collections.blog.read(slug);
  return entry ? { slug, ...entry } : null;
}

export async function getResearchPosts() {
  const slugs = await reader.collections.research.list();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.research.read(slug);
      return entry ? { slug, ...entry } : null;
    }),
  );
  return posts
    .filter(Boolean)
    .sort((a, b) => (b!.publishedAt || "").localeCompare(a!.publishedAt || "")) as NonNullable<
    (typeof posts)[number]
  >[];
}

export async function getResearchPost(slug: string) {
  const entry = await reader.collections.research.read(slug);
  return entry ? { slug, ...entry } : null;
}

export async function getNewsItems() {
  const slugs = await reader.collections.newsroom.list();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.newsroom.read(slug);
      return entry ? { slug, ...entry } : null;
    }),
  );
  return posts
    .filter(Boolean)
    .sort((a, b) => (b!.publishedAt || "").localeCompare(a!.publishedAt || "")) as NonNullable<
    (typeof posts)[number]
  >[];
}

export async function getNewsItem(slug: string) {
  const entry = await reader.collections.newsroom.read(slug);
  return entry ? { slug, ...entry } : null;
}

export async function getEvents() {
  const slugs = await reader.collections.events.list();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.events.read(slug);
      return entry ? { slug, ...entry } : null;
    }),
  );
  return posts
    .filter(Boolean)
    .sort((a, b) => (a!.eventDate || "").localeCompare(b!.eventDate || "")) as NonNullable<
    (typeof posts)[number]
  >[];
}

export async function getEvent(slug: string) {
  const entry = await reader.collections.events.read(slug);
  return entry ? { slug, ...entry } : null;
}
