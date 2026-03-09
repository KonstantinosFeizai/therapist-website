import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

const BASE_URL = "https://www.melisatsela.gr";
const languages = ["el", "en"] as const;
const routes = ["", "/bio", "/blog", "/contact", "/faq", "/privacy"];

type PostSitemapItem = {
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
};

async function getPostSlugs(): Promise<PostSitemapItem[]> {
  const query = `*[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }`;

  return client.fetch(query);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticUrls = routes.flatMap((route) => {
    const localizedUrls = languages.map(
      (lang) => `${BASE_URL}/${lang}${route}`,
    );

    return localizedUrls.map((url) => ({
      url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }));
  });

  const posts = await getPostSlugs();
  const blogUrls = posts.flatMap((post) => {
    const lastModified =
      post._updatedAt || post.publishedAt || now.toISOString();

    return languages.map((lang) => ({
      url: `${BASE_URL}/${lang}/blog/${post.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  });

  return [...staticUrls, ...blogUrls];
}
