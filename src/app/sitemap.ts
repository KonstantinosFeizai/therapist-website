import type { MetadataRoute } from "next";

const BASE_URL = "https://www.melisatsela.gr";
const languages = ["el", "en"] as const;
const routes = ["", "/bio", "/blog", "/contact", "/faq", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) => {
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
}
